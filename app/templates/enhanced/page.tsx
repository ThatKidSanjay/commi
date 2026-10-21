
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./page.css";

const features = [
  {
    number: "01",
    title: "Everything in Personalized",
    description:
      "A digital profile with your name, photo, contact links, social links, and contact-saving functionality.",
  },
  {
    number: "02",
    title: "Business branding",
    description:
      "Your business logo, brand colors, and a customized profile layout that represents your identity.",
  },
  {
    number: "03",
    title: "Up to 10 links",
    description:
      "Connect customers to your website, social media, online shop, booking page, and other important destinations.",
  },
  {
    number: "04",
    title: "Business information",
    description:
      "Present your business contact details, location, products, and services in one convenient place.",
  },
  {
    number: "05",
    title: "Google Maps integration",
    description:
      "Help customers find your business with an embedded map and a direct directions link.",
  },
  {
    number: "06",
    title: "Direct inquiries",
    description:
      "Give potential customers convenient ways to contact your business through available messaging or contact channels.",
  },
];

const services = [
  {
    number: "01",
    title: "Your products",
    description:
      "Showcase your featured products and help visitors discover what your business offers.",
  },
  {
    number: "02",
    title: "Your services",
    description:
      "Highlight your services, specialties, or packages with clear descriptions.",
  },
  {
    number: "03",
    title: "Connect with you",
    description:
      "Make it easier for customers to reach you, save your contact details, and explore your links.",
  },
];

const businessLinks = [
  { label: "Official Website", href: "https://example.com" },
  { label: "Facebook Page", href: "https://facebook.com" },
  { label: "Instagram Profile", href: "https://instagram.com" },
  { label: "Contact Our Business", href: "/contact" },
];

const mapsQuery = encodeURIComponent(
  "Cofradia, Malolos, Bulacan, Philippines"
);

export default function EnhancedPage() {
  return (
    <>
      <Navigation />

      <main className="enhanced-page">
        {/* HERO */}
        <section className="enhanced-hero">
          <div className="enhanced-container">
            <div className="enhanced-hero-grid">
              <div className="enhanced-hero-copy">
                <p className="enhanced-eyebrow">
                  <span className="enhanced-dot" />
                  LHIMF / NFC BUSINESS PROFILE
                </p>

                <h1>
                  Your business.
                  <br />
                  <span>One smart profile.</span>
                </h1>

                <p className="enhanced-lead">
                  Turn a simple NFC tap into a professional business
                  experience. Showcase your brand, services, contact
                  information, and location in one convenient digital
                  profile.
                </p>

                <div className="enhanced-hero-actions">
                  <Link
                    className="enhanced-button enhanced-button-dark"
                    href="/contact"
                  >
                    Customize Your Profile <span>↗</span>
                  </Link>

                  <a
                    className="enhanced-text-link"
                    href="#business-preview"
                  >
                    Explore the preview <span>↓</span>
                  </a>
                </div>

                <div className="enhanced-hero-meta">
                  <span>NFC + QR CODE</span>
                  <span>BUSINESS READY</span>
                  <span>2 REVISION ROUNDS</span>
                </div>
              </div>

              {/* PROFILE PREVIEW */}
              <div
                className="enhanced-device-wrap"
                id="business-preview"
              >
                <div className="enhanced-device">
                  <div className="enhanced-device-top">
                    <span>9:41</span>
                    <span>● ● ●</span>
                  </div>

                  <div className="enhanced-cover">
                    <span className="enhanced-cover-tag">
                      BUSINESS PROFILE
                    </span>
                    <div className="enhanced-cover-orbit enhanced-orbit-one" />
                    <div className="enhanced-cover-orbit enhanced-orbit-two" />
                  </div>

                  <div className="enhanced-profile-content">
                    <div className="enhanced-business-avatar">
                      <span>BR</span>
                    </div>

                    <p className="enhanced-profile-label">
                      YOUR BRAND STARTS HERE
                    </p>

                    <h2>Your Business Name</h2>

                    <p className="enhanced-business-type">
                      Business · Products · Services
                    </p>

                    <p className="enhanced-business-description">
                      Your business introduction goes here. Tell visitors
                      what you do and what makes your brand special.
                    </p>

                    <div className="enhanced-profile-actions">
                      <a href="#business-contact">Contact Us ↗</a>
                      <a href="#business-location">Get Directions ↗</a>
                    </div>

                    <div className="enhanced-profile-divider" />

                    <p className="enhanced-profile-label">
                      DISCOVER OUR BUSINESS
                    </p>

                    <div className="enhanced-mini-link">
                      <span className="enhanced-mini-icon">↗</span>
                      <span>Our Website</span>
                      <span className="enhanced-mini-arrow">→</span>
                    </div>

                    <div className="enhanced-mini-link">
                      <span className="enhanced-mini-icon">◎</span>
                      <span>Social Media</span>
                      <span className="enhanced-mini-arrow">→</span>
                    </div>

                    <div className="enhanced-mini-link">
                      <span className="enhanced-mini-icon">⌖</span>
                      <span>Business Location</span>
                      <span className="enhanced-mini-arrow">→</span>
                    </div>

                    <div className="enhanced-device-footer">
                      POWERED BY <strong>LHIMF.</strong>
                    </div>
                  </div>
                </div>

                <div className="enhanced-floating-note">
                  <span className="enhanced-floating-icon">⌁</span>
                  <span>
                    <strong>One tap away.</strong>
                    <small>Your digital business card</small>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PACKAGE INTRO */}
        <section className="enhanced-section enhanced-intro">
          <div className="enhanced-container enhanced-intro-grid">
            <div>
              <p className="enhanced-eyebrow">01 / THE ENHANCED PACKAGE</p>
              <h2>
                More than contact details.
                <br />
                <span>A complete business presence.</span>
              </h2>
            </div>

            <div className="enhanced-intro-copy">
              <p>
                Your NFC card becomes a gateway to a digital profile built
                around your business. Customers can discover your brand,
                explore your offerings, access your links, and find your
                location from their phones.
              </p>

              <p>
                The profile is designed to work on mobile devices and can
                be accessed through a compatible NFC card or its QR code.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="enhanced-section enhanced-features">
          <div className="enhanced-container">
            <div className="enhanced-section-heading">
              <div>
                <p className="enhanced-eyebrow">02 / WHAT'S INCLUDED</p>
                <h2>
                  Your brand, <span>better connected.</span>
                </h2>
              </div>

              <p>
                The essentials of a personal profile, expanded for
                businesses that want to make a stronger impression.
              </p>
            </div>

            <div className="enhanced-feature-grid">
              {features.map((feature) => (
                <article className="enhanced-feature-card" key={feature.number}>
                  <div className="enhanced-feature-top">
                    <span>{feature.number}</span>
                    <span aria-hidden="true">↗</span>
                  </div>

                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>

            <div className="enhanced-extra-features">
              <span>ALSO INCLUDED</span>
              <p>
                NFC tap-to-open functionality · QR code for digital sharing ·
                Contact-saving button · Mobile-responsive layout ·
                Personalized colors · 2 revision rounds
              </p>
            </div>
          </div>
        </section>

        {/* PRODUCTS AND SERVICES */}
        <section className="enhanced-section enhanced-showcase">
          <div className="enhanced-container">
            <div className="enhanced-section-heading">
              <div>
                <p className="enhanced-eyebrow">03 / SHOWCASE YOUR BUSINESS</p>
                <h2>
                  Give people a reason
                  <br />
                  <span>to connect.</span>
                </h2>
              </div>

              <p>
                Make important information easy to find without sending
                customers across multiple platforms.
              </p>
            </div>

            <div className="enhanced-showcase-grid">
              {services.map((service) => (
                <article
                  className="enhanced-showcase-card"
                  key={service.number}
                >
                  <span className="enhanced-showcase-number">
                    {service.number}
                  </span>

                  <div className="enhanced-showcase-symbol" aria-hidden="true">
                    {service.number === "01"
                      ? "◇"
                      : service.number === "02"
                        ? "✳"
                        : "↗"}
                  </div>

                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* LOCATION */}
        <section
          className="enhanced-section enhanced-location"
          id="business-location"
        >
          <div className="enhanced-container enhanced-location-grid">
            <div className="enhanced-location-copy">
              <p className="enhanced-eyebrow">04 / FIND YOUR BUSINESS</p>

              <h2>
                Your location.
                <br />
                <span>Just a tap away.</span>
              </h2>

              <p>
                Add your business address and help customers navigate to
                your location using Google Maps. The current map preview
                is set to Cofradia, Malolos, Bulacan.
              </p>

              <div className="enhanced-location-address">
                <span className="enhanced-location-pin">⌖</span>
                <span>
                  <strong>Cofradia</strong>
                  <small>Malolos, Bulacan, Philippines</small>
                </span>
              </div>

              <a
                className="enhanced-button enhanced-button-dark"
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noreferrer"
              >
                Open Google Maps <span>↗</span>
              </a>
            </div>

            <div className="enhanced-map-frame">
              <iframe
                title="Map of Cofradia, Malolos, Bulacan"
                src={`https://maps.google.com/maps?q=${mapsQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              <div className="enhanced-map-caption">
                <span className="enhanced-map-status" />
                <span>
                  <strong>Location preview</strong>
                  <small>Cofradia · Malolos, Bulacan</small>
                </span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open location in Google Maps"
                >
                  ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* BUSINESS LINKS */}
        <section
          className="enhanced-section enhanced-links-section"
          id="business-contact"
        >
          <div className="enhanced-container enhanced-links-grid">
            <div>
              <p className="enhanced-eyebrow">05 / YOUR DIGITAL CONNECTIONS</p>
              <h2>
                Everything important.
                <br />
                <span>In one place.</span>
              </h2>

              <p className="enhanced-links-description">
                Give customers one destination for your business website,
                social profiles, inquiries, and other important links.
                These sample destinations can be replaced with your actual
                business links during customization.
              </p>
            </div>

            <div className="enhanced-business-links">
              {businessLinks.map((item, index) => (
                <a
                  className="enhanced-business-link"
                  href={item.href}
                  key={item.label}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <span className="enhanced-link-number">
                    0{index + 1}
                  </span>
                  <span>{item.label}</span>
                  <span className="enhanced-link-arrow">↗</span>
                </a>
              ))}

              <p className="enhanced-links-note">
                Up to 10 links can be configured for your business profile.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="enhanced-section enhanced-how">
          <div className="enhanced-container">
            <div className="enhanced-section-heading">
              <div>
                <p className="enhanced-eyebrow">06 / SIMPLE BY DESIGN</p>
                <h2>
                  Tap. Explore.
                  <br />
                  <span>Connect.</span>
                </h2>
              </div>
            </div>

            <div className="enhanced-steps">
              <article className="enhanced-step">
                <span>01</span>
                <h3>Tap or scan</h3>
                <p>
                  Customers tap a compatible NFC-enabled phone on the card
                  or scan its QR code.
                </p>
              </article>

              <article className="enhanced-step">
                <span>02</span>
                <h3>Explore your profile</h3>
                <p>
                  They can browse your business information, services,
                  links, and location.
                </p>
              </article>

              <article className="enhanced-step">
                <span>03</span>
                <h3>Connect directly</h3>
                <p>
                  Customers can save your contact details, open your links,
                  or contact your business.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="enhanced-cta">
          <div className="enhanced-container enhanced-cta-inner">
            <div>
              <p className="enhanced-eyebrow">YOUR BUSINESS, CONNECTED</p>

              <h2>
                Make every introduction
                <br />
                <span>count.</span>
              </h2>

              <p>
                Bring your brand, business details, services, and links
                together in a customized NFC business profile.
              </p>
            </div>

            <div className="enhanced-cta-actions">
              <Link
                className="enhanced-button enhanced-button-light"
                href="/contact"
              >
                Customize Your Profile <span>↗</span>
              </Link>

              <Link className="enhanced-cta-secondary" href="/packages">
                Explore Packages <span>↗</span>
              </Link>
            </div>

            <div className="enhanced-cta-watermark" aria-hidden="true">
              LHIMF.
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
