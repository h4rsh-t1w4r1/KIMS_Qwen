import type { Metadata } from "next";
import { serif, sansMono } from "./fonts";
import "./globals.css";
import { MotionProvider } from "./components/motion-provider";

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
    <html lang="en" className={`${serif.variable} ${sansMono.variable}`}>
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
