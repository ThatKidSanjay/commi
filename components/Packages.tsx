"use client";

import { useState } from "react";
import Link from "next/link";

type PackageCategory = "Website" | "NFC Card" | "Website + NFC";

type PackageItem = {
  name: string;
  price: string;
  pages: string;
  description: string;
  features: string[];
  note?: string;
  category: PackageCategory;
  popular?: boolean;
  templateLink?: string;
};

const nfcPackages: PackageItem[] = [
  {
    name: "Personalized NFC Profile",
    price: "₱999",
    pages: "1 digital profile + 1 NFC card",
    description:
      "Make a stronger first impression with a customized profile built around your personal brand.",
    category: "NFC Card",
    popular: true,
    templateLink: "/templates/personalized",
    features: [
      "1 NFC card with QR code",
      "Personal digital profile",
      "Name and profile photo",
      "Phone and email contact links",
      "Up to 8 social media links",
      "Customized profile design",
      "Professional title",
      "Contact-saving button (vCard)",
      "Personalized colors and layout",
      "Direct messaging buttons",
      "Tap-to-open functionality",
      "Mobile-responsive profile",
      "Profile setup and deployment",
      "1 revision round",
    ],
  },
  {
    name: "Enhanced NFC Business Profile",
    price: "₱1,499",
    pages: "1 business profile + 1 NFC card",
    description:
      "Present your business professionally with branding, location information, and service highlights.",
    category: "NFC Card",
    templateLink: "/templates/enhanced",
    features: [
      "Everything in Personalized NFC Profile",
      "Business logo and branding",
      "Up to 10 links",
      "Business contact information",
      "Business details and location",
      "Google Maps integration",
      "Products and services highlights",
      "Direct inquiry buttons",
      "QR code for digital sharing",
      "Mobile-responsive profile",
      "2 revision rounds",
    ],
  },
];

const websitePackages: PackageItem[] = [
  {
    name: "Portfolio Website",
    price: "₱1,499",
    pages: "Up to 3 pages",
    description:
      "Present your skills, experience, and projects through a professional personal website.",
    category: "Website",
    features: [
      "Home — Introduction and personal branding",
      "About — Background, skills, and technologies",
      "Projects — Portfolio and featured work",
      "Contact — Contact information and links",
      "Custom portfolio design",
      "Social media integration",
      "Mobile-responsive layout",
      "Basic SEO configuration",
      "Website deployment",
      "2 revision rounds",
    ],
  },
  {
    name: "Event & Invitation Website",
    price: "₱1,499",
    pages: "Single-page website",
    description:
      "Turn your special occasion into a personalized digital experience your guests can access anywhere.",
    category: "Website",
    features: [
      "Personalized event design",
      "Welcome message and event details",
      "Countdown timer",
      "Event or couple's story",
      "Photo gallery",
      "Date, time, and venue information",
      "Google Maps integration",
      "RSVP form or confirmation button",
      "Dress code and event program",
      "Mobile-responsive layout",
      "Website deployment",
      "2 revision rounds",
    ],
  },
  {
    name: "Business Website",
    price: "₱4,999",
    pages: "Up to 5 pages",
    description:
      "Build credibility, showcase your services, and help customers discover and connect with your business.",
    category: "Website",
    popular: true,
    features: [
      "Home — Business overview and highlights",
      "About — Company profile and background",
      "Services — Products or services overview",
      "Gallery — Business photos or completed projects",
      "Contact — Contact details and inquiry form",
      "Customized business branding",
      "Social media integration",
      "Mobile-responsive layout",
      "Basic SEO configuration",
      "Website deployment",
      "3 revision rounds",
    ],
  },
  {
    name: "Corporate / Internal Systems",
    price: "₱7,499",
    pages: "Up to 5 pages or screens",
    description:
      "Digitize everyday operations with a customized web-based system designed around your workflow.",
    category: "Website",
    features: [
      "Login and registration, if required",
      "Dashboard and information overview",
      "Records management",
      "Create and edit record forms",
      "Profile and settings",
      "Database integration, as required",
      "Search, filtering, and sorting, where applicable",
      "Responsive interface",
      "Basic testing and deployment",
      "3 revision rounds",
    ],
    note:
      "Advanced workflows, user permissions, reports, integrations, and additional screens may require a separate quotation. Final pricing depends on the agreed requirements.",
  },
  {
    name: "Community / Organization Website",
    price: "₱5,999",
    pages: "Up to 6 pages",
    description:
      "Bring your organization's identity, announcements, members, and activities together in one accessible website.",
    category: "Website",
    features: [
      "Home — Organization overview",
      "About — History, mission, and vision",
      "Officers and members information",
      "News and announcements",
      "Events and activities",
      "Contact information and inquiry form",
      "Photo gallery",
      "Social media integration",
      "Mobile-responsive layout",
      "Basic SEO configuration",
      "Website deployment",
      "3 revision rounds",
    ],
  },
];

const websiteNfcBundles: PackageItem[] = [
  {
    name: "Portfolio + NFC Bundle",
    price: "₱2,498",
    pages: "Website + 1 NFC card",
    description:
      "Make your portfolio easier to share at interviews, meetings, and networking events.",
    category: "Website + NFC",
    features: [
      "Everything in Portfolio Website (₱1,499)",
      "1 NFC card with QR code (₱999)",
      "NFC card linked to your portfolio website",
      "Showcase your skills and projects",
      "Convenient tap-to-share access",
      "Mobile-friendly website",
    ],
  },
  {
    name: "Event Website + NFC Bundle",
    price: "₱2,498",
    pages: "Website + 1 NFC card",
    description:
      "Give guests convenient access to your event website through a tap or QR scan.",
    category: "Website + NFC",
    features: [
      "Everything in Event & Invitation Website (₱1,499)",
      "1 NFC card with QR code (₱999)",
      "NFC card linked to your event website",
      "Event details, venue, and schedule",
      "Gallery and RSVP features included in the website scope",
      "Easy sharing of event information",
    ],
  },
  {
    name: "Business + NFC Bundle",
    price: "₱5,998",
    pages: "Website + 1 NFC card",
    description:
      "Connect potential customers directly to your business website with a single tap.",
    category: "Website + NFC",
    popular: true,
    features: [
      "Everything in Business Website (₱4,999)",
      "1 NFC card with QR code (₱999)",
      "NFC card linked to your business website",
      "Business services and information",
      "Contact details and social media access",
      "Convenient customer access",
    ],
  },
  {
    name: "Corporate System + NFC Bundle",
    price: "₱8,498",
    pages: "System + 1 NFC card",
    description:
      "Combine a custom web-based system with NFC access to an agreed public page or system entry point.",
    category: "Website + NFC",
    features: [
      "Everything in Corporate / Internal Systems (₱7,499)",
      "1 NFC card with QR code (₱999)",
      "NFC card linked to the agreed system page",
      "Responsive system interface",
      "Database and features within the agreed scope",
      "Basic testing and deployment",
    ],
    note:
      "The NFC card does not replace authentication or user permissions. System features and final pricing depend on the agreed requirements.",
  },
  {
    name: "Organization + NFC Bundle",
    price: "₱6,998",
    pages: "Website + 1 NFC card",
    description:
      "Make your organization's website easy to share at meetings, events, and community activities.",
    category: "Website + NFC",
    features: [
      "Everything in Community / Organization Website (₱5,999)",
      "1 NFC card with QR code (₱999)",
      "NFC card linked to your organization website",
      "Organization information and announcements",
      "Activities and event details",
      "Easy sharing with members and visitors",
    ],
  },
];

function PackageCard({
  pkg,
  index,
}: {
  pkg: PackageItem;
  index: number;
}) {
  const [showFeatures, setShowFeatures] = useState(false);

  function choosePackage() {
    const selection = {
      name: pkg.name,
      price: pkg.price,
      category: pkg.category,
    };

    window.dispatchEvent(
      new CustomEvent("package-selected", {
        detail: selection,
      })
    );

    window.location.hash = "contact";
  }

  return (
    <article
      className={`package-card${pkg.popular ? " package-card-featured" : ""}`}
    >
      <div className="package-top">
        <span className="package-number">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="package-pages">{pkg.pages}</span>
      </div>

      {pkg.popular && (
        <span className="package-popular">POPULAR CHOICE</span>
      )}

      <h4>{pkg.name}</h4>

      <p className="package-description">{pkg.description}</p>

      <div className="package-price">
        <span className="package-price-label">Package price</span>
        <strong>{pkg.price}</strong>
      </div>

      <button
        type="button"
        className="btn package-cta"
        onClick={choosePackage}
      >
        Select Package <span aria-hidden="true">↗</span>
      </button>

      {pkg.templateLink && (
        <Link
          href={pkg.templateLink}
          className="package-template-link"
        >
          View Template <span aria-hidden="true">↗</span>
        </Link>
      )}

      <button
        type="button"
        className="package-toggle"
        aria-expanded={showFeatures}
        onClick={() => setShowFeatures((current) => !current)}
      >
        <span>
          {showFeatures ? "Hide Package Details" : "View Package Details"}
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

          <p className="package-includes">WHAT'S INCLUDED</p>

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

          {pkg.note && <p className="package-note">{pkg.note}</p>}
        </div>
      )}
    </article>
  );
}

function PackageGroup({
  title,
  subtitle,
  packages,
  id,
}: {
  title: string;
  subtitle: string;
  packages: PackageItem[];
  id: string;
}) {
  return (
    <section className="package-group" id={id}>
      <div className="package-heading">
        <p className="label">{subtitle}</p>
        <h3>{title}</h3>
      </div>

      <div className="package-grid">
        {packages.map((pkg, index) => (
          <PackageCard key={pkg.name} pkg={pkg} index={index} />
        ))}
      </div>
    </section>
  );
}

export default function Packages() {
  return (
    <div className="packages">
      <PackageGroup
        id="nfc-packages"
        title="NFC Digital Profiles"
        subtitle="01 / TAP. CONNECT. SHARE."
        packages={nfcPackages}
      />

      <PackageGroup
        id="website-packages"
        title="Website Development"
        subtitle="02 / CUSTOM DIGITAL EXPERIENCES"
        packages={websitePackages}
      />

      <PackageGroup
        id="website-nfc-bundles"
        title="Website + NFC Bundles"
        subtitle="03 / A COMPLETE DIGITAL PRESENCE"
        packages={websiteNfcBundles}
      />
    </div>
  );
}