
import Link from "next/link";
import Navigation from "@/components/Navigation";
import ProgressBar from "@/components/ProgressBar";
import Reveal from "@/components/Reveal";
import Social from "@/components/Social";
import Footer from "@/components/Footer";

const services = [
  {
    number: "01",
    title: "Business Websites",
    subtitle: "Build your business presence.",
    description:
      "Give your business a professional online home where potential customers can learn about your brand, explore your services, and find the information they need.",
    features: [
      "Business and company profiles",
      "Products and services presentation",
      "Contact information and inquiry links",
      "Responsive layouts for mobile and desktop",
    ],
    ideal: "Small businesses, startups, shops, and service providers.",
    category: "Business Website",
    packageName: "Business Website Package",
    packagePrice: "₱3,999",
  },
  {
    number: "02",
    title: "Event & Invitation Websites",
    subtitle: "Make every occasion personal.",
    description:
      "Turn your special occasion into a personalized digital invitation that guests can open on their phones and revisit whenever they need event details.",
    features: [
      "Personalized event design",
      "Date, venue, and event information",
      "Photo galleries and personal stories",
      "Countdowns and RSVP options, depending on scope",
    ],
    ideal:
      "Weddings, debuts, birthdays, baptisms, anniversaries, and other celebrations.",
    category: "Event / Invitation Website",
    packageName: "Event & Invitation Package",
    packagePrice: "₱999",
  },
  {
    number: "03",
    title: "Portfolio & Personal Websites",
    subtitle: "Present your work with confidence.",
    description:
      "Showcase your skills, achievements, experience, and projects through a website designed to represent your personal brand and professional goals.",
    features: [
      "Personal introduction and profile",
      "Skills, experience, and achievements",
      "Project gallery and portfolio",
      "Contact and social media links",
    ],
    ideal: "Freelancers, students, developers, creatives, and professionals.",
    category: "Portfolio Website",
    packageName: "Portfolio Website Package",
    packagePrice: "₱999",
  },
  {
    number: "04",
    title: "Corporate & Internal Systems",
    subtitle: "Make everyday workflows more practical.",
    description:
      "Explore web-based tools that help organize records, manage information, and support internal business processes. Requirements are scoped according to the complexity of the system.",
    features: [
      "Dashboards and data summaries",
      "Record and information management",
      "Database integration",
      "Login and access control, where included in scope",
    ],
    ideal: "Organizations and businesses that need tailored digital workflows.",
    category: "Corporate / Internal System",
    packageName: "Corporate / Internal Systems Package",
    packagePrice: "₱4,499",
  },
  {
    number: "05",
    title: "Community & Organization Websites",
    subtitle: "Bring your community together online.",
    description:
      "Create a central online space for your organization to share its identity, activities, announcements, projects, and important information.",
    features: [
      "Organization profile and objectives",
      "Activities and project highlights",
      "Announcements and updates",
      "Contact and community information",
    ],
    ideal: "Community groups, clubs, associations, and local organizations.",
    category: "Community / Organization Website",
    packageName: "Community Website Package",
    packagePrice: "₱4,999",
  },
  {
    number: "06",
    title: "Custom Web Applications",
    subtitle: "Build around a specific idea.",
    description:
      "Have an idea that does not fit a standard website package? Discuss a custom web application or feature set shaped around your goals, workflow, and technical requirements.",
    features: [
      "Project-specific functionality",
      "Custom user interfaces",
      "Potential API and database integrations",
      "Scope-based planning and quotation",
    ],
    ideal: "Projects that require features beyond a standard informational website.",
    category: "Other / Custom Project",
    packageName: "Custom Project Quotation",
    packagePrice: "Discuss your requirements",
  },
];

const process = [
  {
    number: "01",
    title: "Tell us your idea",
    description:
      "Share what you want to build, who it is for, and what you want the website to accomplish.",
  },
  {
    number: "02",
    title: "Plan the requirements",
    description:
      "Discuss the design direction, pages, features, content, budget, and expected timeline.",
  },
  {
    number: "03",
    title: "Build and review",
    description:
      "Develop the agreed website and review its progress according to the project scope.",
  },
  {
    number: "04",
    title: "Prepare for launch",
    description:
      "Review the completed work and discuss deployment, domain, hosting, and any ongoing support needs.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <ProgressBar />
      <Navigation />

      <main>
        {/* HERO */}
        <header className="hero home-hero" id="top">
          <Social className="hsoc" />

          <div className="wrap home-hero-content">
            <p className="label">
              <span className="home-live-dot" />
              SERVICES · LHIMF WEB DEVELOPMENT
            </p>

            <h1>
              The right website
              <br />
              <span>for your next idea.</span>
            </h1>

            <div className="sub">
              Practical solutions. Thoughtful design. Built around your goals.
            </div>

            <p className="home-hero-copy">
              Explore website development services for personal projects,
              special events, businesses, organizations, and custom digital
              systems. Start with what you need, then shape the project around
              your requirements and budget.
            </p>

            <div className="btns">
              <Link className="btn" href="/contact">
                Discuss Your Project <span>↗</span>
              </Link>

              <Link className="btn alt" href="/packages">
                View Packages <span>↓</span>
              </Link>
            </div>

            <div className="home-hero-note">
              <span>PERSONALIZED APPROACH</span>
              <span>PROJECT-BASED SOLUTIONS</span>
            </div>
          </div>
        </header>

        {/* SERVICE OVERVIEW */}
        <section className="lh-section lh-about" id="overview">
          <div className="wrap">
            <Reveal className="reveal">
              <p className="label">01 / WHAT I OFFER</p>

              <div className="lh-about-grid">
                <h2>
                  Different projects.
                  <br />
                  <span>Different possibilities.</span>
                </h2>

                <div className="lh-about-copy">
                  <p>
                    Every website serves a different purpose. Some introduce a
                    business, others celebrate a milestone, showcase a career,
                    or make everyday work easier.
                  </p>

                  <p>
                    LHIMF offers a range of web development services, with
                    project requirements, design, and functionality discussed
                    before work begins.
                  </p>

                  <Link className="text-link" href="/projects">
                    See selected projects <span>↗</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SERVICES */}
        <section className="lh-section lh-services" id="service-list">
          <div className="wrap">
            <Reveal className="lh-section-heading reveal">
              <p className="label">02 / DEVELOPMENT SERVICES</p>

              <div className="lh-heading-row">
                <h2>
                  Find your starting point.
                  <br />
                  <span>Make it your own.</span>
                </h2>

                <p>
                  Explore the available services and contact LHIMF to discuss
                  the scope, features, and pricing that suit your project.
                </p>
              </div>
            </Reveal>

            <div className="lh-service-grid">
              {services.map((service) => (
                <Reveal
                  className="lh-service-card reveal"
                  key={service.number}
                >
                  <div className="lh-card-top">
                    <span>{service.number}</span>
                    <span aria-hidden="true">↗</span>
                  </div>

                  <h3>{service.title}</h3>

                  <p className="service-subtitle">
                    {service.subtitle}
                  </p>

                  <p>{service.description}</p>

                  <div className="lh-tags">
                    {service.features.map((feature) => (
                      <span key={feature}>{feature}</span>
                    ))}
                  </div>

                  <div className="service-ideal">
                    <span className="lh-contact-label">IDEAL FOR</span>
                    <p>{service.ideal}</p>
                  </div>

                  <div className="service-price">
                    <span className="lh-contact-label">STARTING POINT</span>
                    <p>{service.packagePrice}</p>
                  </div>

                  <div className="service-card-actions">
                    <Link
                      className="text-link"
                      href={`/contact?service=${encodeURIComponent(service.category)}`}
                    >
                      Discuss this service <span>↗</span>
                    </Link>

                    <Link className="text-link" href="/packages">
                      Packages <span>↗</span>
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="lh-section lh-process" id="process">
          <div className="wrap">
            <Reveal className="lh-section-heading reveal">
              <p className="label">03 / HOW WE WORK</p>

              <div className="lh-heading-row">
                <h2>
                  From first conversation
                  <br />
                  <span>to launch.</span>
                </h2>

                <p>
                  A clear process helps define expectations, align priorities,
                  and keep the project focused on its goals.
                </p>
              </div>
            </Reveal>

            <div className="lh-process-list">
              {process.map((step) => (
                <Reveal className="lh-process-step reveal" key={step.number}>
                  <span className="lh-process-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <span className="lh-process-arrow" aria-hidden="true">
                    ↗
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING CTA */}
        <section className="lh-section lh-packages-preview" id="pricing">
          <div className="wrap">
            <Reveal className="lh-packages-panel reveal">
              <div>
                <p className="label">04 / PACKAGES & PRICING</p>

                <h2>
                  Know where to start.
                  <br />
                  <span>Customize from there.</span>
                </h2>

                <p>
                  Standard packages provide a starting point. Additional pages,
                  advanced functionality, integrations, and other requirements
                  may affect the final quotation.
                </p>

                <div className="lh-package-types">
                  <span>Portfolio — ₱999</span>
                  <span>Event — ₱999</span>
                  <span>Business — ₱3,999</span>
                  <span>Corporate — ₱4,499</span>
                  <span>Community — ₱4,999</span>
                </div>
              </div>

              <div className="lh-package-action">
                <span className="lh-package-mark" aria-hidden="true">
                  LHIMF<span>.</span>
                </span>

                <p>
                  Need a different feature set? Share your requirements for a
                  project-specific quotation.
                </p>

                <Link className="btn" href="/packages">
                  Explore Packages <span>↗</span>
                </Link>

                <Link className="text-link" href="/contact">
                  Request a quotation <span>↗</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="home-contact lh-contact" id="contact-cta">
          <Reveal className="wrap reveal">
            <p className="label">05 / LET'S BUILD SOMETHING</p>

            <div className="home-contact-heading">
              <h2>
                Have an idea?
                <br />
                <span>Let's talk about it.</span>
              </h2>

              <p>
                Tell us what you want to create. Start with your idea, and
                we can discuss the right service, features, scope, and budget.
              </p>
            </div>

            <div className="btns">
              <Link className="btn" href="/contact">
                Start Your Project <span>↗</span>
              </Link>

              <Link className="btn alt" href="/faqs">
                Read the FAQs <span>↗</span>
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
