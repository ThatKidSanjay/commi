import type { CSSProperties } from "react";
import { CATS, REVIEWS, STEPS, TECH } from "@/lib/data";
import { TechIcon, ThumbIcon } from "@/components/Icons";
import ContactForm from "@/components/ContactForm";
import ProgressBar from "@/components/ProgressBar";
import Projects from "@/components/Projects";
import Reveal from "@/components/Reveal";
import Social from "@/components/Social";

const ALL_TECH = TECH.flatMap((g) => g[2]);
const idx = (i: number) => ({ "--i": i }) as CSSProperties;

export default function Home() {
  return (
    <>
      <ProgressBar />

      <header className="hero" id="top">
        <div className="mark">LHIMF <span></span></div>
        <Social className="hsoc" />
        <div className="wrap">
          <p className="label">Web Development · LHIMF </p>
          <h1><span>Need a Customized Website?</span></h1>
          <div className="sub">Let&apos;s Build One for You.</div>
          <p>
            From business websites and organizational platforms to personal portfolios and event invitations, LHIMF Dev
            creates modern, responsive websites tailored to your goals, brand, and budget.
          </p>
          <div className="btns">
            <a className="btn" href="#work">View Templates →</a>
            <a className="btn alt" href="#contact">Customize My Website ↗</a>
          </div>
          <p>Your vision. Your requirements. A website built around you.</p>
        </div>
        <div className="scroll">Scroll</div>
      </header>

      <section id="stack" style={{ padding: "40px 0", border: 0 }}>
        <div className="marq" aria-label={ALL_TECH.join(", ")}>
          <div className="track">
            {[0, 1].map((n) =>
              ALL_TECH.map((x) => (
                <span key={`${n}-${x}`}>
                  <TechIcon name={x} />
                  {x}
                </span>
              ))
            )}
          </div>
        </div>
      </section>

      <section id="pricing">
        <Reveal className="wrap reveal">
          <p className="label">01 / Price Range</p>
          <h2>Clear Starting Prices. Flexible Possibilities.</h2>
          <p>
            Every project is different. The prices below are starting estimates, not fixed quotations. Your final
            commission will depend on your chosen design, required pages, functionality, content, integrations, and
            overall project scope.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Website Category</th>
                <th scope="col">Starting Price</th>
              </tr>
            </thead>
            <tbody>
              {CATS.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="grid">
            {STEPS.map((s, i) => (
              <Reveal key={s[0]} className="rv" style={idx(i)}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s[0]}</h3>
                <p>{s[1]}</p>
              </Reveal>
            ))}
          </div>
          <p className="note">Delivery time and revisions are agreed upon for each project.</p>
          <a className="btn" href="#contact">Get a Custom Quote →</a>
        </Reveal>
      </section>

      <section id="work">
        <div className="wrap">
          <p className="label">02 / Projects</p>
          <h2>Real Projects. Real Possibilities.</h2>
          <p>
            Explore selected projects that demonstrate different approaches to business websites, organizational
            systems, personal portfolios, and event experiences.
          </p>
          <Projects />
          <div className="cta-row">
            <h3>Have a project in mind?</h3>
            <p style={{ marginTop: 8 }}>
              Use these projects as inspiration. Your website can have its own design, features, and identity.
            </p>
            <a className="btn" href="#contact">Customize My Website →</a>
          </div>
        </div>
      </section>

    
      <section id="contact">
        <Reveal className="wrap reveal">
          <p className="label">04 / Let&apos;s Work Together</p>
          <h2>Your Website Starts With an Idea.</h2>
          <p>
            Tell me what you want to build. Whether you need a business website, an organizational platform, an internal
            system, a portfolio, or an event invitation, let&apos;s discuss a solution that fits your goals and budget.
          </p>
          <ContactForm />
          <div className="cta-row">
            <h3>Prefer a direct conversation?</h3>
            <p style={{ marginTop: 8 }}>
              Reach out through your preferred platform and let&apos;s talk about your project.
            </p>
            <Social />
          </div>
        </Reveal>
      </section>

      <footer>
        <div className="wrap">
          <div className="row">
            <div>
              <strong>LHIMF Dev</strong>
              <p style={{ margin: "6px 0 16px" }}>Custom websites built around your goals.</p>
              <Social style={{ margin: 0 }} />
            </div>
            <div>
              <p style={{ marginBottom: 12 }}>Have an idea? Let&apos;s turn it into something real.</p>
              <a className="btn" href="#contact">Start Your Project ↗</a>
            </div>
          </div>
          <p className="note" style={{ marginTop: 40 }}>
            © {new Date().getFullYear()} LHIMF Dev · <a href="#top">Back to top ↑</a>
          </p>
        </div>
      </footer>
    </>
  );
}
