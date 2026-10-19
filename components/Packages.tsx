
"use client";

import { useState } from "react";

type PackageItem = {
  name: string;
  price: string;
  pages: string;
  description: string;
  features: string[];
  note?: string;
};

const websitePackages: PackageItem[] = [
  {
    name: "Portfolio Website",
    price: "₱1,499",
    pages: "Up to 3 pages",
    description:
      "Showcase your skills, experience, and projects with a professional personal portfolio.",
    features: [
      "Home — Introduction and personal branding",
      "About Me — Background, skills, and technology stack",
      "Projects / Contact — Project showcase and contact information",
      "Personalized portfolio website design",
      "Social media links",
      "Mobile-responsive layout",
      "Basic SEO setup",
      "Website deployment",
      "Up to 2 revision rounds",
    ],
  },
  {
    name: "Event & Invitation Website",
    price: "₱1,499",
    pages: "1 page",
    description:
      "A personalized digital invitation for weddings, birthdays, debuts, and special occasions.",
    features: [
      "Customized event or invitation design",
      "Welcome message and event details",
      "Countdown timer",
      "Event story or couple's story",
      "Photo gallery",
      "Date, time, and venue details",
      "Google Maps integration",
      "RSVP form or confirmation button",
      "Dress code and event program",
      "Mobile-responsive layout",
      "Website deployment",
      "Up to 2 revision rounds",
    ],
  },
  {
    name: "Business Website",
    price: "₱4,999",
    pages: "Up to 5 pages",
    description:
      "Build your online presence and help customers discover your business and services.",
    features: [
      "Home — Business introduction and highlights",
      "About Us — Company background and information",
      "Services / Products — Offerings and descriptions",
      "Gallery / Portfolio — Business photos or completed projects",
      "Contact Us — Contact details, inquiry form, and location",
      "Customized business branding and design",
      "Social media integration",
      "Mobile-responsive layout",
      "Basic SEO setup",
      "Website deployment",
      "Up to 3 revision rounds",
    ],
  },
  {
    name: "Corporate / Internal Systems",
    price: "₱7,499",
    pages: "Up to 5 pages or screens",
    description:
      "Streamline basic business processes with a customized web-based system.",
    features: [
      "Login / Registration — User access, if required",
      "Dashboard — Overview of system information",
      "Records Management — View and manage data",
      "Create / Edit Records — Forms for adding and updating information",
      "Profile / Settings — Account or system settings",
      "Database integration, depending on requirements",
      "Search, filtering, and sorting, where applicable",
      "Responsive interface",
      "Basic testing and deployment",
      "Up to 3 revision rounds",
    ],
    note:
      "Complex workflows, user roles, reports, integrations, and additional screens may cost extra. Final scope depends on system requirements.",
  },
  {
    name: "Community / Organization Website",
    price: "₱5,999",
    pages: "Up to 6 pages",
    description:
      "Give your organization a central place to share its identity, activities, and announcements.",
    features: [
      "Home — Organization overview and highlights",
      "About Us — History, mission, and vision",
      "Officers / Members — Organization leaders and members",
      "News / Announcements — Updates and notices",
      "Events / Activities — Upcoming and past activities",
      "Contact Us — Contact details and inquiry form",
      "Photo gallery",
      "Social media integration",
      "Mobile-responsive layout",
      "Basic SEO setup",
      "Website deployment",
      "Up to 3 revision rounds",
    ],
  },
];

const nfcPackages: PackageItem[] = [
  {
    name: "Basic NFC Card",
    price: "₱599",
    pages: "1-page digital profile",
    description:
      "A simple tap-to-share digital profile for personal contact information.",
    features: [
      "1 NFC card with printed QR code",
      "Name, profile photo, and short bio",
      "Phone number and email contact links",
      "Up to 3 social media links",
      "Free subdomain under the LHIMF domain",
      "NFC tap-to-open functionality",
      "Direct call and email buttons",
      "Mobile-responsive design",
      "Basic profile setup and deployment",
      "1 revision round",
    ],
  },
  {
    name: "Personalized Card",
    price: "₱999",
    pages: "1-page digital profile",
    description:
      "A personalized digital business card with custom styling and convenient contact sharing.",
    features: [
      "Everything in the Basic NFC Card package",
      "Personalized NFC card design",
      "Custom color theme and profile layout",
      "Business name and professional title",
      "Contact-saving button (vCard)",
      "Up to 5 social media and website links",
      "Direct messaging buttons",
      "Basic SEO metadata",
      "1 revision round",
    ],
  },
  {
    name: "Business Profile",
    price: "₱1,499",
    pages: "1-page business profile",
    description:
      "A professional digital profile designed to present your business and help customers connect.",
    features: [
      "Everything in the Personalized Card package",
      "Business logo and brand colors",
      "Professional business profile layout",
      "Up to 10 social media and website links",
      "Complete business contact information",
      "Business hours and location",
      "Google Maps directions",
      "Products or services highlights",
      "Direct inquiry buttons",
      "QR code for digital sharing",
      "Social media sharing preview",
      "Up to 2 revision rounds",
    ],
  },
  {
    name: "Premium Profile",
    price: "₱2,499",
    pages: "1-page premium business profile",
    description:
      "An enhanced business profile with product showcases, promotional sections, and analytics.",
    features: [
      "Everything in the Business Profile package",
      "Enhanced branding and profile design",
      "Product or service catalog — up to 10 items",
      "Product images, descriptions, and prices",
      "Image gallery or portfolio section",
      "Product inquiry buttons",
      "Featured promotions and announcements",
      "Custom profile URL",
      "Enhanced social sharing preview",
      "Basic visitor analytics",
      "Up to 3 revision rounds",
    ],
  },
  {
    name: "Business Plus",
    price: "₱3,999",
    pages: "1 customized profile",
    description:
      "A more flexible digital business profile with expanded listings and additional custom features.",
    features: [
      "Everything in the Premium Profile package",
      "Premium NFC card customization",
      "Advanced profile customization",
      "Expanded product or service catalog — up to 20 items",
      "Multiple business contact channels",
      "Customer inquiry form",
      "Additional custom profile sections",
      "Profile visit and button-click tracking",
      "Priority setup",
      "Up to 3 revision rounds",
      "Additional features available upon quotation",
    ],
  },
];

function PackageCard({
  pkg,
  index,
  comingSoon = false,
}: {
  pkg: PackageItem;
  index: number;
  comingSoon?: boolean;
}) {
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <article
      className={`package-card${comingSoon ? " package-card-coming-soon" : ""}`}
    >
      <div className="package-top">
        <span className="package-number">
          {String(index + 1).padStart(2, "0")}
        </span>

        {comingSoon ? (
          <span className="package-status">Coming Soon</span>
        ) : (
          <span className="package-pages">{pkg.pages}</span>
        )}
      </div>

      <h4>{pkg.name}</h4>

      <p className="package-description">{pkg.description}</p>

      {comingSoon ? (
        <div className="package-coming-soon">
          <span className="package-coming-soon-icon" aria-hidden="true">
            ◷
          </span>

          <strong>Launching Soon</strong>

          <p>
            Our NFC digital business card packages are currently in
            development. Stay tuned for updates.
          </p>
        </div>
      ) : (
        <>
          <div className="package-price">
            <span className="package-price-label">Starting at</span>
            <strong>{pkg.price}</strong>
          </div>

          <a className="btn package-cta" href="/#contact">
            Choose Package <span aria-hidden="true">↗</span>
          </a>

          <button
            type="button"
            className="package-toggle"
            aria-expanded={showFeatures}
            onClick={() => setShowFeatures((current) => !current)}
          >
            <span>
              {showFeatures ? "Hide Features" : "Show Features"}
            </span>

            <span
              className={`package-toggle-icon${showFeatures ? " is-open" : ""}`}
              aria-hidden="true"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="m6 9 6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>

          {showFeatures && (
            <div className="package-feature-content">
              <div className="package-divider" />

              <p className="package-includes">PACKAGE INCLUDES</p>

              <ul className="package-features">
                {pkg.features.map((feature) => (
                  <li key={feature}>
                    <span className="package-check" aria-hidden="true">
                      ✓
                    </span>

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {pkg.note && (
                <p className="package-note">{pkg.note}</p>
              )}
            </div>
          )}
        </>
      )}
    </article>
  );
}

function PackageGroup({
  title,
  subtitle,
  packages,
  id,
  comingSoon = false,
}: {
  title: string;
  subtitle: string;
  packages: PackageItem[];
  id: string;
  comingSoon?: boolean;
}) {
  return (
    <section
      className={`package-group${comingSoon ? " package-group-coming-soon" : ""}`}
      id={id}
    >
      <div className="package-heading">
        <p className="label">{subtitle}</p>

        <h3>{title}</h3>

        {comingSoon && (
          <p className="package-group-description">
            We&apos;re preparing something new. Our NFC packages will be
            available soon.
          </p>
        )}
      </div>

      <div className="package-grid">
        {packages.map((pkg, index) => (
          <PackageCard
            key={pkg.name}
            pkg={pkg}
            index={index}
            comingSoon={comingSoon}
          />
        ))}
      </div>
    </section>
  );
}

export default function Packages() {
  return (
    <div className="packages">
      <PackageGroup
        id="website-packages"
        title="Website Development Packages"
        subtitle="CUSTOM WEBSITES"
        packages={websitePackages}
      />

      <PackageGroup
        id="nfc-packages"
        title="One-Time NFC Card Packages"
        subtitle="DIGITAL BUSINESS CARDS"
        packages={nfcPackages}
        comingSoon
      />
    </div>
  );
}
