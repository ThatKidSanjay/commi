"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages" },
  { label: "Projects", href: "/projects" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <div className="nav-inner">
        <Link
          href="/"
          className="nav-logo"
          onClick={() => setMenuOpen(false)}
          aria-label="LHIMF home"
        >
          LHIMF<span>.</span>
        </Link>

        <button
          className="nav-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <div className={`nav-links${menuOpen ? " open" : ""}`}>
          {links.map(({ label, href }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`nav-link${active ? " active" : ""}`}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            );
          })}

          <Link
            href="/#contact"
            className="nav-cta"
            onClick={() => setMenuOpen(false)}
          >
            Let's Talk <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
