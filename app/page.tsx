"use client";

import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import ProgressBar from "@/components/ProgressBar";
import Reveal from "@/components/Reveal";
import Social from "@/components/Social";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="lh-home-page">
      <ProgressBar />
      <Navigation />

      <main>
        {/* HERO */}
        <header className="hero home-hero" id="top">
          <Social className="hsoc" />

          <div className="wrap home-hero-content">
            <Reveal className="reveal">
              <p className="label">
                <span className="home-live-dot" />
                WEB DEVELOPMENT · LHIMF
              </p>

              <h1>
                Websites built
                <br />
                <span>around your vision.</span>
              </h1>

              <div className="sub">
                Your idea. Your identity. Your website.
              </div>

              <p className="home-hero-copy">
                From personal portfolios and digital invitations to business
                websites and custom systems, LHIMF builds responsive websites
                shaped around your goals, brand, and budget.
              </p>

              <div className="btns">
                <Link className="btn" href="/contact">
                  Start Your Project <span>↗</span>
                </Link>

                <Link className="btn alt" href="/projects">
                  View Our Work <span>↗</span>
                </Link>
              </div>

              
            </Reveal>
          </div>
        </header>

        {/* ABOUT */}
        <section className="lh-section lh-about" id="about">
          <div className="wrap">
            <Reveal className="reveal">
              <p className="label">01 / ABOUT LHIMF</p>

              <div className="lh-about-grid">
                <h2>
                  Technology should solve problems.
                  <br />
                  <span>Good design makes it easier.</span>
                </h2>

                <div className="lh-about-copy">
                  <p>
                    LHIMF is a web development brand focused on creating
                    practical, responsive, and purpose-driven digital
                    experiences for individuals, businesses, and organizations.
                  </p>

                  <p>
                    Each project is designed around its purpose, intended
                    audience, and requirements, with a focus on usability,
                    thoughtful design, and practical functionality.
                  </p>

                  <Link className="text-link" href="/about">
                    More about LHIMF <span>↗</span>
                  </Link>
                </div>
              </div>
            </Reveal>

            <div className="lh-principles">
              <Reveal className="lh-principle reveal">
                <span className="lh-principle-number">A.</span>
                <h3>Purpose first</h3>
                <p>
                  Every project starts with understanding your goals and
                  what your website needs to accomplish.
                </p>
              </Reveal>

              <Reveal className="lh-principle reveal">
                <span className="lh-principle-number">B.</span>
                <h3>Designed for people</h3>
                <p>
                  Clear layouts and responsive experiences make your website
                  easier to use across devices.
                </p>
              </Reveal>

              <Reveal className="lh-principle reveal">
                <span className="lh-principle-number">C.</span>
                <h3>Built around your needs</h3>
                <p>
                  Design, features, and project scope are tailored to your
                  requirements and budget.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PACKAGES */}
        <section className="lh-section lh-packages-preview" id="packages">
          <div className="wrap">
            <Reveal className="lh-packages-panel reveal">
              <div>
                <p className="label">02 / PACKAGES & PRICING</p>

                <h2>
                  A practical starting point.
                  <br />
                  <span>Room to make it yours.</span>
                </h2>

                <p>
                  Choose a starting package and discuss the design, features,
                  and functionality that best fit your project.
                </p>

                <div className="lh-package-types">
                  <span>Portfolio websites</span>
                  <span>Event invitations</span>
                  <span>Business websites</span>
                  <span>Internal systems</span>
                  <span>Community websites</span>
                </div>
              </div>

              <div className="lh-package-action">
                <span className="lh-package-mark" aria-hidden="true">
                  LHIMF<span>.</span>
                </span>

                <p>
                  Have a specific idea in mind? Let's discuss your requirements
                  and find the right approach for your project.
                </p>

                <Link className="btn" href="/packages">
                  Explore Packages <span>↗</span>
                </Link>

                <Link className="text-link" href="/contact">
                  Request a custom quote <span>↗</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CONTACT */}
        <section className="home-contact lh-contact" id="contact">
          <Reveal className="wrap reveal">
            <p className="label">03 / LET'S WORK TOGETHER</p>

            <div className="home-contact-heading">
              <h2>
                Start with an idea.
                <br />
                <span>Build something real.</span>
              </h2>

              <p>
                Tell me what you have in mind. Share your goals, requirements,
                and budget, and let's discuss a website that works for you.
              </p>

              <div className="btns">
                <Link className="btn" href="/contact">
                  Start a Project <span>↗</span>
                </Link>

                <Link className="btn alt" href="/packages">
                  View Packages <span>↗</span>
                </Link>
              </div>
            </div>

            <div className="lh-contact-details">
              <div>
                <span className="lh-contact-label">EMAIL</span>
                <a href="mailto:lhimfdev@gmail.com">
                  lhimfdev@gmail.com
                </a>
              </div>

              <div>
                <span className="lh-contact-label">SOCIAL</span>
                <p>Follow LHIMF for updates and recent work.</p>
                <Social style={{ margin: 0 }} />
              </div>
            </div>

            <div className="home-contact-form">
              <ContactForm />
            </div>
          </Reveal>
        </section>
      </main>

      {/* SHARED FOOTER */}
      <Footer />
    </div>
  );
}