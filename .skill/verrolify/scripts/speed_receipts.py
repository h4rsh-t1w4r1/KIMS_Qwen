#!/usr/bin/env python3
"""Speed receipts for a LIVE url: real measurements, never estimates.

Usage:  python3 speed_receipts.py https://example.in/ [--runs 3]
Reports per run: status, time to first byte, total time for the HTML. Then the weight of every same-origin asset the
page references (script, stylesheet, image, video, poster, preload), whether responses are compressed, and whether the
host honours HTTP Range on the heaviest video (hosts that do not are why scrub heroes fetch the whole file as a Blob).
Present the numbers with the structural argument (static files, no server code, film streams behind a poster).
"""
import argparse, http.client, re, ssl, sys, time
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

class Refs(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        for k in ("src", "href", "poster"):
            v = d.get(k)
            if not v:
                continue
            if tag == "a":
                continue
            if tag == "link" and not any(x in (d.get("rel") or "") for x in ("stylesheet", "preload", "icon")):
                continue
            self.urls.append(v)
        if d.get("srcset"):
            self.urls.append(d["srcset"].split(",")[0].strip().split(" ")[0])

def request(url, method="GET", headers=None, timeout=20):
    u = urlparse(url)
    Conn = http.client.HTTPSConnection if u.scheme == "https" else http.client.HTTPConnection
    kw = {"context": ssl.create_default_context()} if u.scheme == "https" else {}
    c = Conn(u.netloc, timeout=timeout, **kw)
    path = (u.path or "/") + (("?" + u.query) if u.query else "")
    t0 = time.perf_counter()
    c.request(method, path, headers={"User-Agent": "verro-speed-receipts/1.0", "Accept-Encoding": "gzip, br", **(headers or {})})
    resp = c.getresponse()
    ttfb = time.perf_counter() - t0
    body = resp.read() if method == "GET" else b""
    total = time.perf_counter() - t0
    hdrs = {k.lower(): v for k, v in resp.getheaders()}
    c.close()
    return resp.status, ttfb, total, body, hdrs

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("url")
    ap.add_argument("--runs", type=int, default=3)
    a = ap.parse_args()
    print(f"URL: {a.url}\n")
    body = b""; hdrs = {}
    for i in range(a.runs):
        st, ttfb, total, body, hdrs = request(a.url)
        print(f"run {i+1}: status {st}  TTFB {ttfb*1000:6.0f} ms  total {total*1000:6.0f} ms  html {len(body)/1024:6.1f} KB")
    print(f"\nserver: {hdrs.get('server','?')}   content-encoding: {hdrs.get('content-encoding','none')}   cache-control: {hdrs.get('cache-control','none')}")
    p = Refs(); p.feed(body.decode("utf-8", "replace"))
    origin = urlparse(a.url).netloc
    seen, rows = set(), []
    for ref in p.urls:
        full = urljoin(a.url, ref)
        if urlparse(full).netloc != origin or full in seen or full.startswith("data:"):
            continue
        seen.add(full)
        try:
            st, _, tot, b, h = request(full, "GET")
            size = int(h.get("content-length") or len(b))
            rows.append((size, st, h.get("content-encoding", "-"), full, tot))
        except Exception as e:
            rows.append((0, "ERR", str(e)[:30], full, 0))
    rows.sort(reverse=True)
    print(f"\n{'KB':>8}  {'status':<6} {'enc':<6} asset")
    for size, st, enc, full, tot in rows[:25]:
        print(f"{size/1024:8.1f}  {str(st):<6} {enc:<6} {full.replace(a.url.rstrip('/'), '')}")
    films = [r for r in rows if re.search(r"\.(mp4|webm)(\?|$)", r[3])]
    print(f"\ntotal same-origin weight (all listed): {sum(r[0] for r in rows)/1024:.1f} KB")
    print(f"total excluding film (the phone path): {sum(r[0] for r in rows if r not in films)/1024:.1f} KB")
    if films:
        big = films[0][3]
        try:
            st, *_ , h = request(big, "GET", {"Range": "bytes=0-1"})
            ok = st == 206
            print(f"Range request on {big.split('/')[-1]}: status {st} -> {'host supports Range' if ok else 'NO Range support: keep the Blob fetch'}")
        except Exception as e:
            print("Range test failed:", e)
    print("\nThese are measurements from this machine and network. Quote them as such.")

if __name__ == "__main__":
    main()
