
import type { CSSProperties } from "react";
import { TECH } from "@/lib/data";
import { TechIcon } from "@/components/Icons";
import ContactForm from "@/components/ContactForm";
import ProgressBar from "@/components/ProgressBar";
import Reveal from "@/components/Reveal";
import Social from "@/components/Social";
import Navigation from "@/components/Navigation";

const ALL_TECH = [...new Set(TECH.flatMap((group) => group[2]))];

const idx = (i: number) => ({ "--i": i }) as CSSProperties;

export default function Home() {
  return (
    <>
      <ProgressBar />
      <Navigation />

      <header className="hero home-hero" id="top">
        <Social className="hsoc" />

        <div className="wrap home-hero-content">
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
            From personal portfolios and event invitations to business
            websites and custom digital systems, I build responsive
            experiences shaped around your goals, brand, and budget.
          </p>

          <div className="btns">
            <a className="btn" href="/projects">
              Explore Projects <span>↗</span>
            </a>

            <a className="btn alt" href="#contact">
              Start a Project <span>↗</span>
            </a>
          </div>

          <div className="home-hero-note">
            <span>DESIGNED WITH INTENTION</span>
            <span>BUILT FOR REAL NEEDS</span>
          </div>
        </div>
      </header>

      <section className="home-tech" id="stack" aria-label="Technology stack">
        <div className="marq" aria-label={ALL_TECH.join(", ")}>
          <div className="track">
            {[0, 1].map((n) =>
              ALL_TECH.map((tech, i) => (
                <span key={`${n}-${tech}`} style={idx(i)}>
                  <TechIcon name={tech} />
                  {tech}
                </span>
              )),
            )}
          </div>
        </div>
      </section>

      <section className="home-contact" id="contact">
        <Reveal className="wrap reveal">
          <p className="label">01 / LET'S WORK TOGETHER</p>

          <div className="home-contact-heading">
            <h2>
              Start with an idea.
              <br />
              <span>Build something real.</span>
            </h2>

            <p>
              Tell me what you have in mind. Share your goals, requirements,
              and budget, and let's discuss a website that makes sense for you.
            </p>
          </div>

            <div className="home-contact-form">
              <ContactForm />
            </div>
          
        </Reveal>
      </section>

      <footer className="site-footer">
        <div className="wrap">
          <div className="site-footer-main">
            <div>
              <a className="site-wordmark" href="/">
                LHIMF <span>Dev.</span>
              </a>
              <p className="site-footer-copy">Custom websites built around your goals.

                <br></br>
                <br></br>
              </p>
              <Social style={{ margin: 0 }} />
            </div>

            
          </div>

          <div className="site-footer-bottom">
            <br></br><br></br>
            <span>© {new Date().getFullYear()} LHIMF DEV</span>
            <br></br><br></br>
            <a href="#top">BACK TO TOP ↑</a>
          </div>
        </div>
      </footer>
    </>
  );
}
