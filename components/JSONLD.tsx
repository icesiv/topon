export default function JSONLD() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.topongroup.com/#organization",
        "name": "Top On Group",
        "url": "https://www.topongroup.com",
        "logo": "https://www.topongroup.com/logo.png",
        "description": "Premier international conglomerate in Bangladesh delivering excellence in general trading, global sourcing, and multimodal freight forwarding.",
        "slogan": "On Time. Every Time.",
        "foundingLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "BD",
            "addressLocality": "Dhaka",
            "streetAddress": "Corporate Headquarters"
          }
        },
        "founder": {
          "@type": "Person",
          "name": "Md. Abdullah Al Mamun",
          "jobTitle": "Owner & Managing Director",
          "alumniOf": "Chartered Accountancy Course Completion (CACC)",
          "description": "Supply chain veteran with 15+ years of strategic leadership, CSCM (USA), and former Executive Director at Walton Group."
        },
        "sameAs": [
          "https://www.facebook.com/topongroup",
          "https://www.linkedin.com/company/topongroup"
        ],
        "subOrganization": [
          {
            "@type": "LocalBusiness",
            "@id": "https://www.topongroup.com/#top-on-tech",
            "name": "Top On-Tech",
            "description": "Diversified import, export and trading house sourcing industrial machinery, spares, chemicals, textiles, and electronics.",
            "url": "https://www.topongroup.com/trading-topontech",
            "parentOrganization": { "@id": "https://www.topongroup.com/#organization" },
            "knowsAbout": [
              "Industrial Machinery & Spares",
              "Chemical Supply & Procurement",
              "Textile Fabrics",
              "Electronics & Consumer Goods",
              "International Sourcing",
              "Global Trade Management"
            ]
          },
          {
            "@type": "LocalBusiness",
            "@id": "https://www.topongroup.com/#daily-shipping",
            "name": "Daily Shipping & Logistics",
            "description": "Technology-driven freight forwarding and C&F operations built on 20,000+ containers of operational experience.",
            "url": "https://www.topongroup.com/logistics-dailyshipping",
            "parentOrganization": { "@id": "https://www.topongroup.com/#organization" },
            "knowsAbout": [
              "International Ocean Freight (FCL/LCL)",
              "Air Cargo Freight",
              "Customs Clearing & Forwarding (C&F)",
              "Trade Compliance & Port Handling",
              "Multimodal Supply Chain Logistics"
            ]
          },
          {
            "@type": "LocalBusiness",
            "@id": "https://www.topongroup.com/#top-express",
            "name": "Top Express Limited",
            "description": "Express transit and nationwide courier logistics fleet connecting key commercial hubs.",
            "url": "https://www.topongroup.com/express-topexpress",
            "parentOrganization": { "@id": "https://www.topongroup.com/#organization" },
            "knowsAbout": [
              "Express Courier Services",
              "B2B Linehaul Transit",
              "Nationwide Logistics Fleet"
            ]
          },
          {
            "@type": "LocalBusiness",
            "@id": "https://www.topongroup.com/#top-on-agro",
            "name": "Top On-Agro Farm",
            "description": "Sustainable commercial fisheries, high-density aquaculture, certified hatchery breeding, and cold-chain fish supply.",
            "url": "https://www.topongroup.com/agro-toponagro",
            "parentOrganization": { "@id": "https://www.topongroup.com/#organization" },
            "knowsAbout": [
              "Commercial Aquaculture & Fish Farming",
              "Certified Hatchery & Fingerling Breeding",
              "Cold-Chain Fish Preservation & Transit",
              "Bulk Wholesale Fish Supply"
            ]
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
