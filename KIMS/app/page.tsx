import { Reveal } from "./components/reveal";
import { Stagger, StaggerItem } from "./components/stagger";
import { InquiryForm } from "./components/inquiry-form";

const NAV = [
  { href: "#about", label: "The hospital" },
  { href: "#departments", label: "Departments" },
  { href: "#facilities", label: "Facilities" },
  { href: "#inquire", label: "Inquire" },
];

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>

      {/* ================= NAV ================= */}
      <header className="sticky top-0 z-50 border-b border-line bg-canvas/95 backdrop-blur-sm">
        <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-baseline gap-3">
            <span className="font-display text-2xl font-bold tracking-tight">KIMS</span>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-quiet sm:block">
              Kshitijya Institute of Medical Sciences
            </span>
          </a>
          <div className="flex items-center gap-6">
            <ul className="hidden items-center gap-6 md:flex">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="font-mono text-xs uppercase tracking-[0.14em] text-quiet transition-colors duration-200 hover:text-gold"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#inquire"
              className="min-h-[44px] border border-gold px-5 py-2 font-mono text-xs uppercase tracking-[0.12em] text-gold transition-colors duration-200 hover:bg-gold hover:text-white"
            >
              Sample appointment
            </a>
          </div>
        </nav>
      </header>

      <main id="main">
        {/* ================= HERO: T4 five-part, Split-Screen ================= */}
        <section
          id="top"
          aria-labelledby="hero-h"
          className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-32 lg:pt-24"
        >
          <div>
            <p className="mb-6 inline-block border border-line bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-quiet">
              Fictional demo build
            </p>
            <h1
              id="hero-h"
              className="font-display text-[clamp(2.6rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.01em]"
            >
              A hospital that exists only as good design.
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-quiet">
              KIMS is an invented institute by Verro Studio, built to show what a calm, trustworthy
              healthcare website looks like. Every name and number below is illustrative.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#inquire"
                className="min-h-[48px] bg-gold px-8 py-3 font-mono text-sm uppercase tracking-[0.12em] text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                Try the sample inquiry
              </a>
              <span className="max-w-[30ch] font-mono text-xs leading-relaxed text-quiet">
                No calls, no bookings, no patients. This page is a portfolio piece.
              </span>
            </div>
          </div>
          <figure className="relative">
            <img
              src="/assets/photo-1629909613654-28e377c37b09.avif"
              alt="Bright modern interior corridor of a hospital building"
              width={1000}
              height={668}
              className="aspect-[3/2] w-full border border-line object-cover"
            />
            <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-quiet">
              Facility photograph, Unsplash source. Atmosphere only, not this hospital.
            </figcaption>
          </figure>
        </section>

        {/* ================= ABOUT / PROOF STRIP ================= */}
        <section id="about" aria-labelledby="about-h" className="border-y border-line bg-surface">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:py-28">
            <Reveal>
              <h2 id="about-h" className="font-display text-4xl font-semibold leading-tight lg:text-5xl">
                What this project is
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-6 text-base leading-[1.75] text-ink">
                <p className="max-w-[66ch]">
                  KIMS Hospital, the Kshitijya Institute of Medical Sciences, is a fictional institution
                  created by Verro Studio. The name riffs on well-known Indian medical institutes; it has
                  no connection to any real organisation, government body, or accreditation authority.
                </p>
                <p className="max-w-[66ch] text-quiet">
                  Dr. Kaushik Kshitijya is an invented practitioner. There are no qualifications,
                  registrations, patient counts, reviews, or outcomes behind this site, because none
                  could be true. What is real here is the craft: information architecture, typography,
                  restraint, and a conversion path that tells the truth about itself.
                </p>
                <dl className="grid gap-x-8 gap-y-4 border-t border-line pt-8 sm:grid-cols-2">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-quiet">Project type</dt>
                    <dd className="mt-1 text-base">Fictional portfolio demonstration</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-quiet">Built by</dt>
                    <dd className="mt-1 text-base">Verro Studio</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-quiet">Framework</dt>
                    <dd className="mt-1 text-base">Verrolify Mode 1, Trust Landing</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-quiet">Medical service</dt>
                    <dd className="mt-1 text-base">None offered. Do not seek care here.</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= DEPARTMENTS: list rows, not cards ================= */}
        <section id="departments" aria-labelledby="dept-h" className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <Reveal>
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <h2 id="dept-h" className="font-display text-4xl font-semibold leading-tight lg:text-5xl">
                Illustrative departments
              </h2>
              <p className="max-w-[34ch] font-mono text-xs uppercase tracking-[0.14em] text-quiet">
                Sample labels for layout purposes. Not services offered.
              </p>
            </div>
          </Reveal>
          <Stagger className="divide-y divide-line border-y border-line">
            {[
              ["General medicine", "Front-door care: consultations, follow-ups, referrals."],
              ["Cardiology", "A named department so the list reads like a real hospital directory."],
              ["Orthopaedics", "Shows how a two-column service row carries plain patient language."],
              ["Paediatrics", "Demonstrates tone: short sentences, no promises, no fear."],
            ].map(([title, desc]) => (
              <StaggerItem key={title}>
                <div className="grid items-baseline gap-3 py-8 sm:grid-cols-[minmax(0,240px)_1fr_auto] sm:gap-8">
                  <h3 className="font-display text-2xl font-semibold">{title}</h3>
                  <p className="max-w-[60ch] text-base leading-[1.7] text-quiet">{desc}</p>
                  <span className="justify-self-start font-mono text-[11px] uppercase tracking-[0.16em] text-goldsoft sm:justify-self-end">
                    Illustrative
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ================= FACILITIES: asymmetric mosaic, dark band ================= */}
        <section id="facilities" aria-labelledby="fac-h" className="border-y border-line bg-ink text-canvas">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
            <Reveal>
              <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                <h2 id="fac-h" className="font-display text-4xl font-semibold leading-tight lg:text-5xl">
                  The rooms visitors would see
                </h2>
                <p className="max-w-[38ch] text-sm leading-relaxed text-canvas/70">
                  Stock facility photography sets the atmosphere. None of these rooms belong to a real
                  hospital in this project, and none show real staff or patients.
                </p>
              </div>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[180px]">
              <figure className="sm:col-span-2 lg:col-span-7 lg:row-span-3">
                <img
                  src="/assets/photo-1512678080530-7760d81faba6.avif"
                  alt="Wide view of a bright modern medical facility interior"
                  width={1000}
                  height={664}
                  loading="lazy"
                  className="h-full max-h-[420px] w-full object-cover"
                />
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-canvas/60">
                  Establishing view
                </figcaption>
              </figure>
              <figure className="lg:col-span-5 lg:row-span-2">
                <img
                  src="/assets/photo-1622253692010-333f2da6031d.avif"
                  alt="Vertical composition of a clinical interior space with glass and steel detail"
                  width={900}
                  height={1125}
                  loading="lazy"
                  className="h-full max-h-[420px] w-full object-cover object-top"
                />
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-canvas/60">
                  Interior detail
                </figcaption>
              </figure>
              <figure className="lg:col-span-5 lg:row-span-1">
                <img
                  src="/assets/photo-1519494026892-80bbd2d6fd0d.avif"
                  alt="Calm consultation room setting with soft daylight"
                  width={700}
                  height={476}
                  loading="lazy"
                  className="h-full max-h-[220px] w-full object-cover"
                />
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-canvas/60">
                  Consultation space
                </figcaption>
              </figure>
              <figure className="lg:col-span-4 lg:row-span-2">
                <img
                  src="/assets/photo-1579684385127-1ef15d508118.avif"
                  alt="Square crop of medical equipment in a clean treatment environment"
                  width={600}
                  height={600}
                  loading="lazy"
                  className="h-full max-h-[380px] w-full object-cover"
                />
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-canvas/60">
                  Equipment, generic
                </figcaption>
              </figure>
              <figure className="lg:col-span-4 lg:row-span-2">
                <img
                  src="/assets/photo-1584515979956-d9f6e5d09982.avif"
                  alt="Healthcare workspace interior with muted tones"
                  width={600}
                  height={480}
                  loading="lazy"
                  className="h-full max-h-[380px] w-full object-cover"
                />
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-canvas/60">
                  Workspace
                </figcaption>
              </figure>
              <figure className="lg:col-span-4 lg:row-span-2">
                <img
                  src="/assets/photo-1588776814546-1ffcf47267a5.avif"
                  alt="Clinical facility corridor with even lighting"
                  width={600}
                  height={400}
                  loading="lazy"
                  className="h-full max-h-[380px] w-full object-cover"
                />
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-canvas/60">
                  Corridor
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ================= HOW AN INQUIRY WOULD WORK ================= */}
        <section aria-labelledby="how-h" className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <Reveal>
            <h2 id="how-h" className="mb-4 font-display text-4xl font-semibold leading-tight lg:text-5xl">
              How a real version of this page would work
            </h2>
            <p className="mb-14 max-w-[62ch] text-base leading-[1.75] text-quiet">
              On a live clinic site, the same layout would connect to the owner&apos;s approved channel: a phone
              line, a WhatsApp business number, or a hosted form endpoint. Here every destination is
              intentionally empty.
            </p>
          </Reveal>
          <ol className="grid gap-x-12 gap-y-10 sm:grid-cols-3">
            {[
              ["Choose a department", "A visitor picks the area they need from a plain-language directory."],
              ["Send one request", "A single form, validated on the spot, with the destination stated honestly."],
              ["Get a human reply", "On a real site, the practice confirms the slot by the channel it actually uses."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <li className="list-none border-t-2 border-gold pt-6">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-goldsoft">Step {i + 1}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold">{t}</h3>
                  <p className="mt-2 max-w-[40ch] text-sm leading-[1.7] text-quiet">{d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ================= INQUIRY: sample form ================= */}
        <section id="inquire" aria-labelledby="inq-h" className="border-t border-line bg-surface">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-[1fr_1.15fr] lg:py-28">
            <Reveal>
              <h2 id="inq-h" className="font-display text-4xl font-semibold leading-tight lg:text-5xl">
                Request a sample appointment
              </h2>
              <p className="mt-6 max-w-[46ch] text-base leading-[1.75] text-quiet">
                Fill this in to see the interaction design. It validates input, responds visibly, and sends
                nothing anywhere. A fictional hospital keeps your words to itself.
              </p>
              <figure className="mt-10">
                <img
                  src="/assets/photo-1516549655169-df83a0774514.avif"
                  alt="Reception-style interior of a healthcare facility"
                  width={600}
                  height={400}
                  loading="lazy"
                  className="aspect-[3/2] w-full max-w-md border border-line object-cover"
                />
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-quiet">
                  Reception atmosphere, stock photo
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="border border-line bg-canvas p-8 sm:p-10">
                <InquiryForm />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= VISIT US: honest NAP block ================= */}
        <section aria-labelledby="visit-h" className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <h2 id="visit-h" className="font-display text-4xl font-semibold leading-tight lg:text-5xl">
                  Finding KIMS
                </h2>
                <p className="mt-6 max-w-[58ch] text-base leading-[1.75] text-quiet">
                  A real hospital page would place an address, a map pin, hours, and a phone number here.
                  We will not invent those. Production builds mark each missing client fact with a token
                  that blocks delivery until the owner supplies it. On this demo we simply say: there is
                  no location, because there is no hospital.
                </p>
              </div>
              <dl className="divide-y divide-line border-y border-line font-mono text-sm">
                {[
                  ["Address", "Not provided. Fictional institution."],
                  ["Phone", "Not provided. Do not dial placeholder numbers."],
                  ["Hours", "Not provided. No doors exist to open."],
                  ["Maps", "No pin. Any resemblance to living or dead is purely coincidental."],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="uppercase tracking-[0.14em] text-quiet">{k}</dt>
                    <dd className="text-right text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </section>

        {/* ================= CLOSING CTA ================= */}
        <section aria-labelledby="close-h" className="border-t border-line bg-ink text-canvas">
          <Reveal>
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8 px-6 py-20 lg:py-24">
              <h2 id="close-h" className="max-w-[24ch] font-display text-3xl font-semibold leading-tight lg:text-4xl">
                Judge this build on the craft, not the cure.
              </h2>
              <div className="flex flex-wrap items-center gap-6">
                <a
                  href="#inquire"
                  className="min-h-[48px] border border-goldsoft bg-gold px-8 py-3 font-mono text-sm uppercase tracking-[0.12em] text-white transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Back to the sample inquiry
                </a>
                <a
                  href="https://verro-canvas.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm uppercase tracking-[0.12em] text-goldsoft underline underline-offset-4 transition-colors duration-200 hover:text-canvas"
                >
                  See Verro Studio
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ================= FOOTER: mandatory disclosures ================= */}
      <footer className="border-t border-line bg-canvas">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="font-display text-xl font-semibold">KIMS Hospital</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-quiet">
                Kshitijya Institute of Medical Sciences
              </p>
              <p className="mt-6 max-w-[52ch] text-sm leading-[1.7] text-ink">
                This is a{" "}
                <a
                  href="https://verro-canvas.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline decoration-2 underline-offset-2 transition-colors duration-200 hover:text-gold"
                >
                  Verro Studio
                </a>{" "}
                fictional build. Any resemblance to living or dead is purely coincidental...
              </p>
            </div>
            <div className="flex flex-col justify-between gap-6 lg:items-end">
              <ul className="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-[0.14em] text-quiet">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="transition-colors duration-200 hover:text-gold">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="max-w-[44ch] font-mono text-[11px] leading-relaxed text-quiet lg:text-right">
                Not a medical provider. Never seek care from this site. Photography via Unsplash licence,
                used for atmosphere only.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
