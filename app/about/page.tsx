
import Link from "next/link";
import Navigation from "@/components/Navigation";
import ProgressBar from "@/components/ProgressBar";
import Reveal from "@/components/Reveal";
import Social from "@/components/Social";
import Footer from "@/components/Footer";

const principles = [
  {
    number: "01",
    title: "Purpose before pixels",
    description:
      "Every project starts with understanding the idea, the people it serves, and the problem it needs to solve.",
  },
  {
    number: "02",
    title: "Design with intention",
    description:
      "A website should feel considered and easy to use, with a visual direction that supports its identity and goals.",
  },
  {
    number: "03",
    title: "Built around real needs",
    description:
      "Features and functionality are chosen according to the project scope, intended users, and available budget.",
  },
  {
    number: "04",
    title: "Made for every screen",
    description:
      "Responsive layouts help visitors explore a website on mobile phones, tablets, laptops, and desktop displays.",
  },
];

const capabilities = [
  "Business and professional websites",
  "Personal portfolios and online profiles",
  "Digital event invitations",
  "Corporate and internal web systems",
  "Community and organization websites",
  "Custom web applications",
];

export default function AboutPage() {
  return (
    <>
      <ProgressBar />
      <Navigation />

      <main>
        {/* PAGE HERO */}
        <header className="hero home-hero" id="top">
          <Social className="hsoc" />

          <div className="wrap home-hero-content">
            <p className="label">
              <span className="home-live-dot" />
              ABOUT LHIMF · WEB DEVELOPMENT
            </p>

            <h1>
              More than a website.
              <br />
              <span>A purpose behind it.</span>
            </h1>

            <div className="sub">
              Your idea. Your identity. Built with intention.
            </div>

            <p className="home-hero-copy">
              LHIMF creates responsive websites and practical digital
              experiences for individuals, businesses, and organizations.
              Every project is an opportunity to turn an idea into something
              useful, accessible, and uniquely yours.
            </p>

            <div className="btns">
              <Link className="btn" href="/contact">
                Start Your Project <span>↗</span>
              </Link>

              <Link className="btn alt" href="/services">
                Explore Services <span>↓</span>
              </Link>
            </div>

            <div className="home-hero-note">
              <span>DESIGNED WITH INTENTION</span>
              <span>BUILT FOR REAL NEEDS</span>
            </div>
          </div>
        </header>

        {/* INTRODUCTION */}
        <section className="lh-section lh-about" id="introduction">
          <div className="wrap">
            <Reveal className="reveal">
              <p className="label">01 / WHO WE ARE</p>

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
                    experiences.
                  </p>

                  <p>
                    From personal portfolios and event invitations to business
                    websites and custom systems, the goal is to build websites
                    that communicate clearly, support real needs, and reflect
                    the people behind them.
                  </p>

                  <p>
                    No two projects have exactly the same purpose. That is why
                    each website should be shaped around its intended audience,
                    requirements, identity, and goals.
                  </p>

                  <Link className="text-link" href="/services">
                    Discover what we build <span>↗</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="lh-section lh-services" id="principles">
          <div className="wrap">
            <Reveal className="lh-section-heading reveal">
              <p className="label">02 / OUR APPROACH</p>

              <div className="lh-heading-row">
                <h2>
                  Thoughtful decisions.
                  <br />
                  <span>Meaningful results.</span>
                </h2>

                <p>
                  Good web development brings together purpose, design,
                  usability, and the right functionality for the project.
                </p>
              </div>
            </Reveal>

            <div className="lh-service-grid">
              {principles.map((principle) => (
                <Reveal
                  className="lh-service-card reveal"
                  key={principle.number}
                >
                  <div className="lh-card-top">
                    <span>{principle.number}</span>
                    <span aria-hidden="true">↗</span>
                  </div>

                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="lh-section lh-portfolio" id="capabilities">
          <div className="wrap">
            <Reveal className="lh-section-heading reveal">
              <p className="label">03 / WHAT WE DO</p>

              <div className="lh-heading-row">
                <h2>
                  Different ideas.
                  <br />
                  <span>One digital partner.</span>
                </h2>

                <p>
                  Whether you need a place to showcase your work or a system
                  that supports everyday operations, we can discuss the right
                  starting point for your project.
                </p>
              </div>
            </Reveal>

            <div className="lh-process-list">
              {capabilities.map((capability, index) => (
                <Reveal
                  className="lh-process-step reveal"
                  key={capability}
                >
                  <span className="lh-process-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{capability}</h3>

                  <span
                    className="lh-process-arrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </Reveal>
              ))}
            </div>

            <div className="lh-portfolio-bottom">
              <span>HAVE AN IDEA IN MIND?</span>

              <Link className="btn alt" href="/projects">
                Explore Our Projects <span>↗</span>
              </Link>
            </div>
          </div>
        </section>

        {/* WORKING TOGETHER */}
        <section className="lh-section lh-process" id="working-together">
          <div className="wrap">
            <Reveal className="lh-packages-panel reveal">
              <div>
                <p className="label">04 / YOUR IDEA, YOUR DIRECTION</p>

                <h2>
                  Start with what
                  <br />
                  <span>you have in mind.</span>
                </h2>

                <p>
                  You do not need every detail figured out before reaching out.
                  Share your idea, goals, preferred style, and budget. We can
                  discuss the requirements and shape a practical direction
                  together.
                </p>
              </div>

              <div className="lh-package-action">
                <span className="lh-package-mark" aria-hidden="true">
                  LHIMF<span>.</span>
                </span>

                <p>
                  Have a clear plan or just an idea? Let's talk about your next
                  project.
                </p>

                <Link className="btn" href="/contact">
                  Start Your Project <span>↗</span>
                </Link>

                <Link className="text-link" href="/packages">
                  Explore Packages <span>↗</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

    <Footer />
    </>
  );
}
