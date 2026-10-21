
import Link from "next/link";
import Navigation from "@/components/Navigation";
import ProgressBar from "@/components/ProgressBar";
import Reveal from "@/components/Reveal";
import Social from "@/components/Social";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Frequently Asked Questions | LHIMF",
  description:
    "Find answers to common questions about LHIMF website development services, packages, customization, and the project process.",
};

const faqs = [
  {
    category: "SERVICES",
    question: "What services does LHIMF offer?",
    answer:
      "LHIMF offers portfolio websites, event and invitation websites, business websites, corporate and internal systems, community websites, and custom web applications.",
  },
  {
    category: "SERVICES",
    question: "Can you create a website based on my own idea?",
    answer:
      "Yes. Websites can be customized around your goals, preferred design, content, and required features. Share your idea so we can discuss the best approach for your project.",
  },
  {
    category: "PRICING",
    question: "How much does a website cost?",
    answer:
      "Current starting package prices include ₱1,499 for portfolio and event or invitation websites, ₱3,999 for business websites, ₱4,499 for corporate or internal systems, and ₱4,999 for community or organization websites. Custom projects may require a separate quotation.",
  },
  {
    category: "PRICING",
    question: "Are there additional expenses?",
    answer:
      "Depending on your project, third-party services, domain registration, hosting, paid integrations, or other external tools may have separate costs. These can be discussed before the project begins.",
  },
  {
    category: "CUSTOMIZATION",
    question: "Can I request changes to the design?",
    answer:
      "Yes. The design can be tailored to your brand, preferred colors, content, and project requirements. The scope of revisions should be discussed before work begins.",
  },
  {
    category: "CUSTOMIZATION",
    question: "Will my website work on mobile devices?",
    answer:
      "Websites are designed with responsive layouts so visitors can use them across mobile phones, tablets, and desktop screens. Exact features depend on the project scope.",
  },
  {
    category: "PROCESS",
    question: "How do I start a project?",
    answer:
      "Visit the Contact page and share your project idea, business or event details, preferred features, and target timeline. This helps determine the right solution for your needs.",
  },
  {
    category: "PROCESS",
    question: "How long does it take to build a website?",
    answer:
      "The timeline depends on the size of the project, the features requested, and how quickly the necessary content and feedback are provided. A timeline can be discussed after reviewing your requirements.",
  },
  {
    category: "PROCESS",
    question: "Can I see previous projects?",
    answer:
      "Yes. Visit the Projects page to explore examples of websites and digital projects created by LHIMF.",
  },
  {
    category: "SUPPORT",
    question: "Can I request updates after the website is launched?",
    answer:
      "Yes. You can discuss updates, improvements, and additional features. Any ongoing support or additional development should be agreed upon separately.",
  },
];

export default function FAQsPage() {
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
                QUESTIONS & ANSWERS
              </p>

              <h1>
                Good questions.
                <br />
                <span>Clear answers.</span>
              </h1>

              <p className="sub home-hero-copy">
                Learn more about LHIMF's website development services, pricing,
                customization options, and what to expect when starting a
                project.
              </p>

              <div className="btns">
                <Link href="#faq-list" className="btn">
                  Browse FAQs <span aria-hidden="true">↓</span>
                </Link>

                <Link href="/contact" className="btn alt">
                  Ask a Question <span aria-hidden="true">↗</span>
                </Link>
              </div>

              <p className="home-hero-note">
                Still have questions? Let's talk about your project.
              </p>
            </Reveal>
          </div>
        </section>

        {/* FAQ list */}
        <section className="lh-section" id="faq-list">
          <div className="wrap">
            <Reveal>
              <div className="lh-section-heading">
                <p className="label">FREQUENTLY ASKED QUESTIONS</p>
                <h2>
                  Everything you need
                  <br />
                  <span>to know before starting.</span>
                </h2>
                <p className="sub">
                  Can't find the answer you're looking for? Contact LHIMF to
                  discuss your specific requirements.
                </p>
              </div>
            </Reveal>

            <div className="faq-page-list">
              {faqs.map((faq, index) => (
                <Reveal key={faq.question}>
                  <details className="faq-page-item">
                    <summary>
                      <span className="faq-page-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="faq-page-question">
                        <span className="faq-page-category">
                          {faq.category}
                        </span>
                        {faq.question}
                      </span>

                      <span className="faq-page-icon" aria-hidden="true">
                        +
                      </span>
                    </summary>

                    <div className="faq-page-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="lh-section">
          <div className="wrap">
            <Reveal>
              <div className="home-contact">
                <div className="home-contact-heading">
                  <p className="label">LET'S MAKE IT HAPPEN</p>
                  <h2>
                    Have a different
                    <br />
                    <span>question in mind?</span>
                  </h2>
                  <p className="sub">
                    Tell me what you're planning to build. We can discuss your
                    idea, requirements, and the right direction for your
                    website.
                  </p>

                  <div className="btns">
                    <Link href="/contact" className="btn">
                      Start a Project <span aria-hidden="true">↗</span>
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
