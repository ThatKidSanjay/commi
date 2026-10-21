
import Link from "next/link";
import "./page.css";
import Navigation from "@/components/Navigation";

const features = [
  {
    number: "01",
    title: "1 NFC Card with QR Code",
    description:
      "A physical NFC card with a QR code for convenient profile sharing.",
  },
  {
    number: "02",
    title: "Personal Digital Profile",
    description:
      "A dedicated online profile that brings your professional identity together.",
  },
  {
    number: "03",
    title: "Name and Profile Photo",
    description:
      "Introduce yourself with your name and a personalized profile picture.",
  },
  {
    number: "04",
    title: "Phone and Email Contact Links",
    description:
      "Let visitors call you or email you directly from your profile.",
  },
  {
    number: "05",
    title: "Up to 8 Social Media Links",
    description:
      "Connect your audience to your social platforms from one convenient page.",
  },
  {
    number: "06",
    title: "Customized Profile Design",
    description:
      "Get a profile designed around your preferred look and personal identity.",
  },
  {
    number: "07",
    title: "Professional Title",
    description:
      "Display your job title, profession, or business role.",
  },
  {
    number: "08",
    title: "Contact-Saving Button (vCard)",
    description:
      "Allow visitors to save your contact details using a downloadable vCard.",
  },
  {
    number: "09",
    title: "Personalized Colors and Layout",
    description:
      "Choose a visual style that reflects your personality or professional brand.",
  },
  {
    number: "10",
    title: "Direct Messaging Buttons",
    description:
      "Make it easier for people to reach you through supported messaging platforms.",
  },
  {
    number: "11",
    title: "Tap-to-Open Functionality",
    description:
      "Share your digital profile by tapping your NFC card on a compatible phone.",
  },
  {
    number: "12",
    title: "Mobile-Responsive Profile",
    description:
      "Enjoy a profile designed to look great on smartphones and other screen sizes.",
  },
  {
    number: "13",
    title: "Profile Setup and Deployment",
    description:
      "We configure your profile and publish it online for you.",
  },
  {
    number: "14",
    title: "1 Revision Round",
    description:
      "Request one round of design adjustments after the initial presentation.",
  },
];

export default function PersonalizedNFCProfilePage() {
  return (
    <main className="nfc-page">
      <header className="nfc-header">
        <Navigation />
      </header>

      <section className="nfc-hero">
        <div className="nfc-hero-copy">
          <div className="nfc-eyebrow">
            <span className="nfc-status-dot" />
            LHIMF DIGITAL IDENTITY
          </div>

          <h1>
            Your identity.
            <br />
            <span>One tap away.</span>
          </h1>

          <p className="nfc-hero-description">
            Make every introduction count with a personalized NFC business
            card and digital profile that connects people to you, your work,
            and your social platforms.
          </p>

          <div className="nfc-price">
            <span className="nfc-price-label">
              PERSONALIZED NFC PROFILE
            </span>

            <div className="nfc-price-value">
              ₱999 <span>/ package</span>
            </div>

            <p>One card. One profile. A smarter way to connect.</p>
          </div>

          <div className="nfc-hero-actions">
            <Link href="/#contact" className="nfc-button nfc-button-dark">
              Get your NFC profile <span>↗</span>
            </Link>

            <a href="#features" className="nfc-button nfc-button-light">
              Explore features <span>↓</span>
            </a>
          </div>

          <div className="nfc-trust-note">
            <span>✓</span> Personalized design
            <span className="nfc-trust-divider">/</span>
            <span>✓</span> Mobile-friendly
          </div>
        </div>

        {/* Actual LHIMF NFC card designs */}
        <div className="nfc-hero-visual">
          <div className="nfc-visual-label">
            <span>01 / YOUR DIGITAL ID</span>
            <span>DESIGNED BY LHIMF</span>
          </div>

          <div className="nfc-product-stage nfc-real-product">
            <div className="nfc-product-image nfc-product-back">
              <img
                src="/images/lhimf-nfc-card.png"
                alt="LHIMF NFC card featuring the white logo and tap symbol"
              />
              <span className="nfc-product-caption">TAP TO CONNECT</span>
            </div>

            <div className="nfc-product-image nfc-product-front">
              <img
                src="/images/lhimf-nfc-profile.png"
                alt="LHIMF digital business card design with name, website, email, and phone"
              />
              <span className="nfc-product-caption">YOUR DIGITAL ID</span>
            </div>

            <div className="nfc-floating-note">
              <span className="nfc-floating-icon">↗</span>
              <span>
                <strong>One simple tap.</strong>
                <small>Your digital identity, connected.</small>
              </span>
            </div>
          </div>

          <div className="nfc-visual-footer">
            <span>PERSONALIZED NFC PROFILE</span>
            <span>DESIGN MEETS TECHNOLOGY.</span>
          </div>
        </div>
      </section>

      <section className="nfc-stats" aria-label="Package highlights">
        <div>
          <strong>01</strong>
          <span>Physical NFC card</span>
        </div>
        <div>
          <strong>08</strong>
          <span>Social links maximum</span>
        </div>
        <div>
          <strong>∞</strong>
          <span>Make connections easier</span>
        </div>
        <div>
          <strong>01</strong>
          <span>Revision round</span>
        </div>
      </section>

      <section className="nfc-features-section" id="features">
        <div className="nfc-section-heading">
          <div>
            <span className="nfc-section-label">
              WHAT&apos;S INCLUDED / 14 FEATURES
            </span>

            <h2>
              Everything you need.
              <br />
              <span>All in one profile.</span>
            </h2>
          </div>

          <p>
            Your personalized NFC package combines a physical card with a
            digital profile built to make sharing your professional identity
            simple and convenient.
          </p>
        </div>

        <div className="nfc-features-grid">
          {features.map((feature) => (
            <article className="nfc-feature" key={feature.number}>
              <div className="nfc-feature-top">
                <span className="nfc-feature-number">
                  / {feature.number}
                </span>
                <span className="nfc-feature-arrow">↗</span>
              </div>

              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="nfc-how-section">
        <div className="nfc-how-intro">
          <span className="nfc-section-label">SIMPLE BY DESIGN</span>

          <h2>
            Introductions,
            <br />
            <span>reimagined.</span>
          </h2>

          <p>
            No need to hand out multiple links or repeatedly type your
            details. Bring your essential contact information together in
            one convenient place.
          </p>
        </div>

        <div className="nfc-steps">
          <article className="nfc-step">
            <span>01</span>
            <div>
              <h3>Tap or scan</h3>
              <p>
                Someone taps your NFC card on a compatible phone or scans
                its QR code.
              </p>
            </div>
            <span className="nfc-step-icon">⌁</span>
          </article>

          <article className="nfc-step">
            <span>02</span>
            <div>
              <h3>Your profile opens</h3>
              <p>
                They discover your professional details, contact options,
                and social links.
              </p>
            </div>
            <span className="nfc-step-icon">↗</span>
          </article>

          <article className="nfc-step">
            <span>03</span>
            <div>
              <h3>Connect and save</h3>
              <p>
                They can reach you through available links or save your
                contact details with the vCard button.
              </p>
            </div>
            <span className="nfc-step-icon">✓</span>
          </article>
        </div>
      </section>

      <section className="nfc-included">
        <div className="nfc-included-copy">
          <span className="nfc-section-label">
            YOUR NEXT INTRODUCTION
          </span>

          <h2>
            Small card.
            <br />
            <span>Big possibilities.</span>
          </h2>

          <p>
            Whether you&apos;re a freelancer, student, entrepreneur, or
            working professional, make it easier for people to discover
            who you are and how to reach you.
          </p>

          <Link href="/#contact" className="nfc-button nfc-button-white">
            Let&apos;s build your profile <span>↗</span>
          </Link>
        </div>

        <div className="nfc-included-price">
          <span>PERSONALIZED NFC PROFILE</span>
          <strong>₱999</strong>
          <p>One complete personalized package.</p>

          <div className="nfc-included-divider" />

          <ul>
            <li>✓ 1 NFC card with QR code</li>
            <li>✓ Custom digital profile</li>
            <li>✓ Up to 8 social links</li>
            <li>✓ vCard contact saving</li>
            <li>✓ Setup and deployment</li>
            <li>✓ 1 revision round</li>
          </ul>

          <Link href="/#contact" className="nfc-included-link">
            Start your project <span>↗</span>
          </Link>
        </div>
      </section>

      <footer className="nfc-footer">
        <Link href="/" className="nfc-brand">
          lhimf<span>.</span>
        </Link>

        <p>Digital experiences built around people.</p>

        <Link href="/packages">Explore all packages ↗</Link>

        <span className="nfc-footer-copy">
          © {new Date().getFullYear()} LHIMF
        </span>
      </footer>
    </main>
  );
}
