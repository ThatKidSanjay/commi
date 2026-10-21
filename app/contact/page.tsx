
import Link from "next/link";
import Navigation from "@/components/Navigation";
import ProgressBar from "@/components/ProgressBar";
import Reveal from "@/components/Reveal";
import Social from "@/components/Social";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact | Start a Project with LHIMF",
  description:
    "Have a website idea? Contact LHIMF to discuss your project, requirements, and website development options.",
};

export default function ContactPage() {
  return (
    <>
      <ProgressBar />
      <Navigation />

      <main>
        {/* Hero */}
        <section className="hero home-hero">
            <Social className="hsoc" />
          <div className="wrap home-hero-content">
            <Reveal>
              <p className="label">
                <span className="home-live-dot" />
                LET'S BUILD SOMETHING
              </p>

              <h1>
                Have an idea?
                <br />
                <span>Let's bring it to life.</span>
              </h1>

              <p className="sub home-hero-copy">
                Tell me about your business, event, or project. We'll explore
                the right approach to turn your idea into a useful digital
                experience.
              </p>

              <div className="btns">
                <Link href="#project-form" className="btn">
                  Start a Project <span aria-hidden="true">↓</span>
                </Link>
              </div>

              <p className="home-hero-note">
                Website development · Custom design · Digital solutions
              </p>
            </Reveal>
          </div>
        </section>

        {/* Contact section */}
        <section className="lh-section lh-contact" id="project-form">
          <div className="wrap">
            <div className="contact-page-grid">
              <Reveal>
                <div className="contact-page-info">
                  <p className="label">START A CONVERSATION</p>

                  <h2>
                    Tell me what
                    <br />
                    <span>you're planning.</span>
                  </h2>

                  <p className="sub">
                    Whether you need a personal portfolio, an event invitation,
                    a business website, or a custom system, share your goals
                    and requirements to get started.
                  </p>

                  <div className="contact-page-details">
                    <div className="contact-page-detail">
                      <span className="contact-page-label">EMAIL</span>
                      <a href="mailto:lhimfdev@gmail.com">
                        lhimfdev@gmail.com
                      </a>
                    </div>

                    <div className="contact-page-detail">
                      <span className="contact-page-label">
                        PROJECT EXAMPLES
                      </span>
                      <Link href="/projects">
                        Explore previous projects ↗
                      </Link>
                    </div>

                    <div className="contact-page-detail">
                      <span className="contact-page-label">
                        NOT SURE WHAT YOU NEED?
                      </span>
                      <Link href="/faqs">
                        Read frequently asked questions ↗
                      </Link>
                    </div>
                  </div>

                  <div className="contact-page-social">
                    <span className="contact-page-label">FIND LHIMF ONLINE</span>
                    <Social />
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="contact-page-form">
                  <div className="contact-page-form-heading">
                    <p className="label">PROJECT INQUIRY</p>
                    <h3>Let's talk details.</h3>
                    <p className="sub">
                      Share what you have in mind. The more details you provide,
                      the easier it is to understand your project.
                    </p>
                  </div>

                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Services reminder */}
        <section className="lh-section">
          <div className="wrap">
            <Reveal>
              <div className="home-contact">
                <div className="home-contact-heading">
                  <p className="label">YOUR IDEA, YOUR IDENTITY</p>
                  <h2>
                    A website built
                    <br />
                    <span>around your vision.</span>
                  </h2>

                  <p className="sub">
                    Explore the available packages and services to find a
                    starting point for your next project.
                  </p>

                  <div className="btns">
                    <Link href="/packages" className="btn">
                      View Packages <span aria-hidden="true">↗</span>
                    </Link>

                    <Link href="/about" className="btn alt">
                      About LHIMF
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

    
      <Footer />
    </>
  );
}
