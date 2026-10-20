
import Navigation from "@/components/Navigation";
import Social from "@/components/Social";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  return (
    <div className="projects-page">
      <Navigation />

      {/* HERO */}
      <header className="hero home-hero" id="top">
              <Social className="hsoc" />
      
              <div className="wrap home-hero-content">
                <p className="label">
                  <span className="home-live-dot" />
                  WEB PROJECTS · LHIMF
                </p>
      
                <h1>
                  Digital work.
                  <br />
                  <span>Made with purpose.</span>
                </h1>
      
                <div className="sub">
                  Your idea. Your identity. Your website.
                </div>
      
                <p className="home-hero-copy">
                  Websites and digital experiences designed to help ideas, businesses, and communities move forward.
                </p>
      
                <div className="btns">
                  <a className="btn" href="/projects">
                    Explore My Projects <span>↓</span>
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

      {/* PROJECTS */}
      <main>
        

        <div className="projects-work" id="work">
          <Projects />
        </div>
      </main>


    <Footer />
    </div>
  );
}
