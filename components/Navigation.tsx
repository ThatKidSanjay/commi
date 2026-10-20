
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Projects", href: "/projects" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQs", href: "/faqs" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <div className="nav-inner">
        {/* LOGO */}
        <Link
          href="/"
          className="nav-logo"
          onClick={closeMenu}
          aria-label="LHIMF home"
        >
          LHIMF<span>.</span>
        </Link>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="nav-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        {/* NAVIGATION LINKS */}
        <div
          className={`nav-links${menuOpen ? " open" : ""}`}
          id="primary-navigation"
        >
          <Link
            href="/"
            className={`nav-link${pathname === "/" ? " active" : ""}`}
            aria-current={pathname === "/" ? "page" : undefined}
            onClick={closeMenu}
          >
            Home
          </Link>

          {links.map(({ label, href }) => {
            const active =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                className={`nav-link${active ? " active" : ""}`}
                aria-current={active ? "page" : undefined}
                onClick={closeMenu}
              >
                {label}
              </Link>
            );
          })}

          {/* CONTACT CTA */}
          <Link
            href="/contact"
            className={`nav-cta${pathname === "/contact" ? " active" : ""}`}
            aria-current={pathname === "/contact" ? "page" : undefined}
            onClick={closeMenu}
          >
            Start a Project <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
