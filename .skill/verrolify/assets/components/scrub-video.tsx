"use client";
/**
 * Scroll-scrubbed hero film. A React port of references/scroll/scrub-pipeline.md. Read that file before you edit this one.
 * It implements, in order: the five static-hero gates (CSS and JS identical, re-decided live), poster first then a
 * streamed Blob fetch with a 20 s stall watchdog (hosts without HTTP Range support), a frame-rate independent lerp that
 * rests when converged or off-screen, deadlock-safe seek gating, and a failure path that collapses to a still hero.
 *
 * Usage (inside a client component):
 *   <ScrubVideo src="/assets/hero-scrub.mp4" poster="/assets/hero-first.webp" staticImage="/assets/hero-end.webp" heightVh={400}>
 *     {(progress, state) => <Captions progress={progress} />}
 *   </ScrubVideo>
 *
 * Architecture rules:
 *  - Put the real H1, subheadline and CTA in the `overlay` prop (plain markup, so a server component can pass it). It is
 *    rendered inside the stage, on top, in server HTML: visible before hydration, on phones, with JavaScript off. Use the
 *    render-prop children only for scroll-driven captions. Phones and reduced-motion visitors get `progress = 1`.
 *  - Encode the film for scrubbing (dense keyframes, `-g 8`): references/scroll/ffmpeg-recipes.md.
 *  - Size the track in scroll distance: about 400 vh for a 6 s shot, about 1000 vh for an 18 s chain.
 *  - Ancestors must not set overflow hidden or auto, or the sticky stage stops pinning.
 *  - iPad Safari: if the seeked frame stays black, prime the decoder once after `canplay` with
 *    `video.play().then(() => video.pause())`. Verify on a real device. Do not guess.
 */
import { useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** The five static-hero gates. These strings must stay character-for-character identical in CSS and JS. */
export const SCRUB_GATES = [
  "(max-width: 720px)",
  "(orientation: portrait) and (max-width: 1024px)",
  "(orientation: portrait) and (pointer: coarse)",
  "(orientation: landscape) and (pointer: coarse) and (max-height: 560px)",
  "(prefers-reduced-motion: reduce)",
] as const;

export type ScrubState = { ready: boolean; failed: boolean; loadProgress: number; isStatic: boolean };

type Props = {
  /** Same-origin mp4 of the scrub film. */
  src: string;
  /** First frame, shown while the film loads on scrub-capable screens. */
  poster: string;
  /** Composed ending frame for the static hero (phones, portrait tablets, reduced motion). Defaults to `poster`. */
  staticImage?: string;
  /** Real byte size of the film, used when Content-Length is missing. */
  bytes?: number;
  /** MIME type of the film. Default video/mp4 (H.264). Use video/webm for a WebM film. */
  mime?: string;
  /** Track height in svh. */
  heightVh?: number;
  /** Smoothing per 60 fps frame. Tune by feel. */
  smoothing?: number;
  className?: string;
  /** Static markup layered on top of the stage: the real H1, subheadline and CTA. Server-renderable. */
  overlay?: ReactNode;
  /** Scroll-driven captions. Receives the smoothed 0 to 1 progress. Client components only. */
  children?: (progress: MotionValue<number>, state: ScrubState) => ReactNode;
};

const GATE_CSS = `
.vsv-video{transition:opacity .4s ease}
@media ${SCRUB_GATES.join(", ")}{
  .vsv-track{height:auto !important}
  .vsv-stage{position:relative !important;height:auto !important}
  .vsv-video{display:none !important}
}`;

export function ScrubVideo({
  src,
  poster,
  staticImage,
  bytes = 0,
  mime = "video/mp4",
  heightVh = 400,
  smoothing = 0.16,
  className,
  overlay,
  children,
}: Props) {
  const trackRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const progress = useMotionValue(0);
  const [isStatic, setIsStatic] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  const eng = useRef({
    target: 0,
    shown: 0,
    raf: null as number | null,
    last: 0,
    onScreen: false,
    armed: false,
    kick: () => {},
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    eng.current.target = v;
    eng.current.kick();
  });

  useEffect(() => {
    const e = eng.current;
    const video = videoRef.current;
    const track = trackRef.current;
    if (!video || !track) return;

    const ctrl = new AbortController();
    let disposed = false;
    let seekBusy = false;
    let pending: number | null = null;
    let blobStarted = false;
    let blobUrl = "";
    let posterTimer: ReturnType<typeof setTimeout> | undefined;

    // Deadlock-safe seek gate: one seek in flight, coalesce to the newest target, reset on error.
    const requestSeek = (t: number) => {
      if (!video.duration || !Number.isFinite(video.duration)) return;
      if (seekBusy) {
        pending = t;
        return;
      }
      seekBusy = true;
      video.currentTime = t;
    };
    const onSeeked = () => {
      seekBusy = false;
      if (pending !== null) {
        const t = pending;
        pending = null;
        requestSeek(t);
      }
    };
    const onError = () => {
      seekBusy = false;
      pending = null;
    };
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", onError);

    // Lerp the displayed time. The pow term makes smoothing independent of the display refresh rate.
    const tick = (now: number) => {
      const dt = Math.min(100, now - (e.last || now));
      e.last = now;
      e.shown += (e.target - e.shown) * (1 - Math.pow(1 - smoothing, dt / 16.667));
      if (Math.abs(e.target - e.shown) < 0.0005) {
        e.shown = e.target;
        e.raf = null;
        e.last = 0;
      } else {
        e.raf = requestAnimationFrame(tick);
      }
      requestSeek(e.shown * (video.duration || 0));
      progress.set(e.shown);
    };
    e.kick = () => {
      if (e.armed && e.onScreen && e.raf === null) e.raf = requestAnimationFrame(tick);
    };

    // Stream the film into a Blob so scrubbing works on hosts without Range support.
    const loadBlob = async () => {
      let watchdog = setTimeout(() => ctrl.abort(), 20000);
      try {
        const res = await fetch(src, { signal: ctrl.signal, priority: "low" } as RequestInit);
        if (!res.ok || !res.body) throw new Error("film fetch failed");
        const total = Number(res.headers.get("Content-Length")) || bytes || 0;
        const reader = res.body.getReader();
        const chunks: Uint8Array[] = [];
        let got = 0;
        let lastRing = 0;
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          clearTimeout(watchdog);
          watchdog = setTimeout(() => ctrl.abort(), 20000);
          chunks.push(value);
          got += value.length;
          const now = performance.now();
          if (now - lastRing > 100) {
            lastRing = now;
            setLoadProgress(total ? Math.min(1, got / total) : 0);
          }
        }
        clearTimeout(watchdog);
        if (disposed) return;
        setLoadProgress(1);
        blobUrl = URL.createObjectURL(new Blob(chunks as BlobPart[], { type: mime }));
        video.src = blobUrl;
        video.load();
        video.addEventListener(
          "canplay",
          () => {
            requestSeek(e.target * video.duration);
            setReady(true);
          },
          { once: true },
        );
      } catch {
        clearTimeout(watchdog);
        if (!disposed) setFailed(true);
      }
    };

    const startBlob = () => {
      if (blobStarted || disposed) return;
      blobStarted = true;
      void loadBlob();
    };

    const arm = () => {
      if (e.armed) return;
      e.armed = true;
      e.target = e.shown = scrollYProgress.get();
      setIsStatic(false);
      progress.set(e.shown);
      // Poster wins the bandwidth race: start the film only after the poster is in, or after 4 s.
      const img = imgRef.current;
      if (!img || img.complete) startBlob();
      else {
        img.addEventListener("load", startBlob, { once: true });
        img.addEventListener("error", startBlob, { once: true });
        posterTimer = setTimeout(startBlob, 4000);
      }
      e.kick();
    };

    const disarm = () => {
      e.armed = false;
      if (e.raf !== null) cancelAnimationFrame(e.raf);
      e.raf = null;
      e.last = 0;
    };

    const mqls = SCRUB_GATES.map((q) => window.matchMedia(q));
    const apply = () => {
      if (mqls.some((q) => q.matches)) {
        disarm();
        setIsStatic(true);
        progress.set(1);
      } else {
        arm();
      }
    };
    mqls.forEach((q) => q.addEventListener("change", apply));

    const io = new IntersectionObserver(
      ([entry]) => {
        e.onScreen = entry.isIntersecting;
        if (e.onScreen) e.kick();
      },
      { rootMargin: "100px" },
    );
    io.observe(track);

    apply();

    return () => {
      disposed = true;
      ctrl.abort();
      clearTimeout(posterTimer);
      io.disconnect();
      mqls.forEach((q) => q.removeEventListener("change", apply));
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
      if (e.raf !== null) cancelAnimationFrame(e.raf);
      e.raf = null;
      e.armed = false;
      e.kick = () => {};
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [src, bytes, mime, smoothing, progress, scrollYProgress]);

  const fill = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } as const;

  return (
    <section
      ref={trackRef}
      className={`vsv-track${className ? ` ${className}` : ""}`}
      style={{ position: "relative", height: failed ? "auto" : `${heightVh}svh` }}
    >
      <style dangerouslySetInnerHTML={{ __html: GATE_CSS }} />
      <div
        className="vsv-stage"
        style={{
          position: failed ? "relative" : "sticky",
          top: 0,
          height: failed ? "auto" : "100svh",
          minHeight: "100svh",
          overflow: "hidden",
        }}
      >
        <picture>
          <source media={SCRUB_GATES.join(", ")} srcSet={staticImage ?? poster} />
          <img ref={imgRef} src={poster} alt="" fetchPriority="high" decoding="async" style={fill} />
        </picture>
        <video
          ref={videoRef}
          className="vsv-video"
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
          style={{ ...fill, opacity: ready && !isStatic && !failed ? 1 : 0, willChange: "transform" }}
        />
        {children?.(progress, { ready, failed, loadProgress, isStatic })}
        {overlay ? <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>{overlay}</div> : null}
      </div>
    </section>
  );
}

/**
 * Caption band helper. Fades and lifts a caption in at `from`, holds, and fades it out by `to` (progress 0 to 1).
 * Needs to - from > 2 * ramp. Pace bands in scroll distance, never seconds (references/scroll/scrub-pipeline.md).
 *   const { opacity, y } = useBand(progress, 0.1, 0.35);
 *   <m.p style={{ opacity, y }}>...</m.p>
 */
export function useBand(progress: MotionValue<number>, from: number, to: number, ramp = 0.04) {
  const input = [from, from + ramp, to - ramp, to];
  const opacity = useTransform(progress, input, [0, 1, 1, 0]);
  const y = useTransform(progress, input, [12, 0, 0, -12]);
  return { opacity, y };
}
