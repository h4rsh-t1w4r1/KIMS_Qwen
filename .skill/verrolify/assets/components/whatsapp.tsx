/**
 * WhatsApp click-to-chat for Indian local businesses. No hooks, so it works in server components.
 * Number format: country code plus number, digits only (919876543210). A bare 10-digit Indian number gets 91 prepended.
 * Write the prefilled message in the language of the page and make it say what the visitor wants
 * ("Hi, I'd like to book a first visit for scaling and polishing").
 * Track clicks with the optional onClick if the page is a client component (analytics event named after the outcome).
 */
import type { AnchorHTMLAttributes, ReactNode } from "react";

export function whatsappLink(phone: string, message: string, defaultCountry = "91"): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 10) digits = defaultCountry + digits;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> & {
  phone: string;
  message: string;
  children?: ReactNode;
};

export function WhatsAppButton({ phone, message, children = "Chat on WhatsApp", className, ...rest }: Props) {
  return (
    <a
      href={whatsappLink(phone, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={{ minHeight: 44, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
      {...rest}
    >
      {children}
    </a>
  );
}

/**
 * Bottom bar on phones: Call and WhatsApp, always one thumb away. Hidden from 768px up.
 * Add padding-bottom to the page footer equal to the bar height so it never covers content.
 * Colours come from CSS variables (--bar-bg, --bar-fg, --bar-accent) so the client's palette applies.
 */
export function StickyContactBar({
  phone,
  message,
  callLabel = "Call",
  chatLabel = "WhatsApp",
}: {
  phone: string;
  message: string;
  callLabel?: string;
  chatLabel?: string;
}) {
  const digits = phone.replace(/\D/g, "");
  const tel = digits.length === 10 ? `+91${digits}` : `+${digits}`;
  const css = `.vcb{position:fixed;left:0;right:0;bottom:0;z-index:40;display:flex;gap:1px;padding-bottom:env(safe-area-inset-bottom,0px);background:var(--bar-bg,#111)}
.vcb a{flex:1;min-height:52px;display:flex;align-items:center;justify-content:center;font-weight:600;text-decoration:none;color:var(--bar-fg,#fff)}
.vcb a.vcb-primary{background:var(--bar-accent,#0a7)}
@media (min-width:768px){.vcb{display:none}}`;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <nav className="vcb" aria-label="Contact">
        <a href={`tel:${tel}`}>{callLabel}</a>
        <a className="vcb-primary" href={whatsappLink(phone, message)} target="_blank" rel="noopener noreferrer">
          {chatLabel}
        </a>
      </nav>
    </>
  );
}
