"use client";

import Link from "next/link";
import Social from "@/components/Social";


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer lh-footer-centered">
      <div className="wrap">
        <div className="lh-footer-center">
          {/* Brand */}
          <Link className="site-wordmark" href="/">
            LHIMF <span>Dev.</span>
          </Link>

          <p className="lh-footer-tagline">
            Your idea. Your identity. Your website.
          </p>

          {/* Social Links */}
          <div className="lh-footer-social">
            <Social style={{ margin: 0 }} />
          </div>

          {/* Footer Navigation */}
          <nav
            className="lh-footer-nav"
            aria-label="Footer navigation"
          >
          </nav>

          {/* Contact CTA */}
          <div className="lh-footer-cta">
            <p>Have a project in mind?</p>
            <Link
              href="/contact"
              className="lh-footer-contact-link"
            >
              Let’s build it together <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="lh-footer-divider" />

          {/* Copyright and Back to Top */}
          <div className="site-footer-bottom lh-footer-copyright">
            <span>
              © {currentYear} LHIMF Dev. All rights reserved.
            </span>

            <a href="#top" className="lh-footer-top">
              BACK TO TOP ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}