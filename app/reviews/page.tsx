
import Link from "next/link";
import Navigation from "@/components/Navigation";
import ProgressBar from "@/components/ProgressBar";
import Reveal from "@/components/Reveal";
import Social from "@/components/Social";
import ReviewSection from "@/components/ReviewSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Client Reviews | LHIMF",
  description:
    "See client feedback and experiences with LHIMF website development services.",
};

export default function ReviewsPage() {
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
                CLIENT FEEDBACK
              </p>

              <h1>
                Real projects.
                <br />
                <span>Real experiences.</span>
              </h1>

              <p className="sub home-hero-copy">
                Every project is a collaboration. Explore feedback from people
                who have worked with LHIMF and see what the experience was like.
              </p>

              <div className="btns">
                <Link href="#client-reviews" className="btn">
                  Read Reviews <span aria-hidden="true">↓</span>
                </Link>

                <Link href="/contact" className="btn alt">
                  Work With Me <span aria-hidden="true">↗</span>
                </Link>
              </div>

              <p className="home-hero-note">
                Independent web development · Built around your vision
              </p>
            </Reveal>
          </div>
        </section>

        {/* Reviews */}
        <section
          className="lh-section lh-reviews"
          id="client-reviews"
        >
          <div className="wrap">
            <Reveal>
              <div className="lh-section-heading">
                <p className="label">WHAT CLIENTS SAY</p>
                <h2>
                  Feedback that
                  <br />
                  <span>means something.</span>
                </h2>
                <p className="sub">
                  Honest feedback helps build trust, improve the process, and
                  make every next project better.
                </p>
              </div>
            </Reveal>

            <ReviewSection />
          </div>
        </section>

        {/* Leave a review CTA */}
        <section className="lh-section">
          <div className="wrap">
            <Reveal>
              <div className="home-contact">
                <div className="home-contact-heading">
                  <p className="label">YOUR EXPERIENCE MATTERS</p>
                  <h2>
                    Worked with LHIMF?
                    <br />
                    <span>Share your experience.</span>
                  </h2>
                  <p className="sub">
                    Your feedback can help future clients understand the
                    process and help LHIMF continue improving its services.
                  </p>

                  <div className="btns">
                    <Link href="/contact" className="btn">
                      Get in Touch <span aria-hidden="true">↗</span>
                    </Link>

                    <Link href="/projects" className="btn alt">
                      Explore Projects
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
