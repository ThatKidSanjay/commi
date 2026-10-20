
import Navigation from "@/components/Navigation";
import Social from "@/components/Social";
import Packages from "@/components/Packages";
import Footer from "@/components/Footer";

export default function PackagesPage() {
  return (
    <div className="packages-page">
      <Navigation />

      <header className="hero home-hero" id="top">
        <Social className="hsoc" />

        <div className="wrap home-hero-content">
          <p className="label">
            <span className="home-live-dot" />
            WEBSITE PACKAGES · LHIMF DEV
          </p>

          <h1>
            The right website.
            <br />
            <span>Built for your goals.</span>
          </h1>

          <div className="sub">
            A practical starting point for your next idea.
          </div>

          <p className="home-hero-copy">
            Whether you're building a personal portfolio, inviting guests
            to an event, growing a business, or creating a platform for an
            organization, find a starting point that fits your needs.
          </p>

          <div className="btns">
            <a className="btn" href="#packages">
              Explore Packages <span>↓</span>
            </a>

            <a className="btn alt" href="#contact">
              Start a Project <span>↗</span>
            </a>
          </div>
        </div>

      </header>

      <main>
        <section className="packages-section" id="packages">
          <div className="wrap">
            <div className="packages-intro">
              <p className="label">FIND YOUR STARTING POINT</p>
              <h2>Website packages</h2>
              <p>
                Choose a package that fits your project, then customize
                it to match your goals.
              </p>
            </div>

            <div className="packages-list">
              <Packages />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
