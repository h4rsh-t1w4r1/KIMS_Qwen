import type { Metadata } from "next";
import { Fraunces, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "./components/motion-provider";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KIMS Hospital | A Fictional Healthcare Build by Verro Studio",
  description:
    "A fictional demonstration website for Kshitijya Institute of Medical Sciences, a made-up hospital. Built by Verro Studio as a portfolio piece.",
  openGraph: {
    title: "KIMS Hospital | A Fictional Healthcare Build by Verro Studio",
    description:
      "Fictional portfolio demonstration. Not a real medical provider.",
    type: "website",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "KIMS Hospital (Kshitijya Institute of Medical Sciences)",
  description:
    "A fictional hospital created for a Verro Studio web design demonstration. Not a real medical institution.",
  additionalType: "CreativeWork",
  creator: {
    "@type": "Organization",
    name: "Verro Studio",
    url: "https://verro-canvas.lovable.app/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <link rel="preload" as="image" href="/assets/photo-1629909613654-28e377c37b09.avif" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="bg-canvas text-ink font-body">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
