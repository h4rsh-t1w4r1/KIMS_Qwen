/**
 * JSON-LD helpers. Use the most specific schema.org type that is true (Dentist, MedicalClinic, HealthClub, HairSalon,
 * BeautySalon, RealEstateAgent, BookStore, ElectronicsStore, JewelryStore, EducationalOrganization, ProfessionalService),
 * falling back to LocalBusiness. Every value must match the truth ledger and the Google Business Profile exactly (NAP).
 * Render once per page in the layout or page: <JsonLd data={buildLocalBusiness({...})} />
 * FAQ markup: Google limited FAQ rich results in 2023, so treat FAQPage as structured content and never promise rich results.
 */
export type OpeningHours = { days: string[]; opens: string; closes: string };

export type LocalBusinessInput = {
  type?: string;
  name: string;
  url: string;
  telephone: string;
  image?: string[];
  description?: string;
  address: { street: string; locality: string; region: string; postalCode: string; country?: string };
  geo?: { lat: number; lng: number };
  hours?: OpeningHours[];
  sameAs?: string[];
  priceRange?: string;
  areaServed?: string[];
};

export function buildLocalBusiness(i: LocalBusinessInput) {
  return {
    "@context": "https://schema.org",
    "@type": i.type ?? "LocalBusiness",
    name: i.name,
    url: i.url,
    telephone: i.telephone,
    ...(i.image?.length ? { image: i.image } : {}),
    ...(i.description ? { description: i.description } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: i.address.street,
      addressLocality: i.address.locality,
      addressRegion: i.address.region,
      postalCode: i.address.postalCode,
      addressCountry: i.address.country ?? "IN",
    },
    ...(i.geo ? { geo: { "@type": "GeoCoordinates", latitude: i.geo.lat, longitude: i.geo.lng } } : {}),
    ...(i.hours?.length
      ? {
          openingHoursSpecification: i.hours.map((h) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.days,
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
    ...(i.sameAs?.length ? { sameAs: i.sameAs } : {}),
    ...(i.priceRange ? { priceRange: i.priceRange } : {}),
    ...(i.areaServed?.length ? { areaServed: i.areaServed } : {}),
  };
}

export function buildFaq(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };
}

export function buildBreadcrumbs(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((x, idx) => ({ "@type": "ListItem", position: idx + 1, name: x.name, item: x.url })),
  };
}

/** Escapes `<` so a stray `</script>` in data can never break out of the tag. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
