export const CONFIG = {
  email: "lhimfdev@gmail.com",
  social: [
    ["Facebook", "https://www.facebook.com/profile.php?id=61595064296933"],
    ["Instagram", "https://www.instagram.com/lhimf.dev/"],
    ["TikTok", "https://www.tiktok.com/@lhimf.dev"],
    ["Email", "mailto:lhimfdev@gmail.com"],
  ] as [string, string][],
  // Set to a URL (e.g. Formspree / your API route) to POST the form as JSON.
  // Leave empty to fall back to a prefilled mailto: link.
  endpoint: "",
};

export type Cat = { id: string; name: string; price: string; note: string; formValue: string };

export const CATS: Cat[] = [
  { id: "portfolio", name: "Portfolio Websites", price: "₱999", note: "Final quotation depends on content, design, and features.", formValue: "Portfolio Website" },
  { id: "event", name: "Event & Invitation Websites", price: "₱999", note: "Final quotation depends on design, interactive features, and requested inclusions.", formValue: "Event / Invitation Website" },
  { id: "business", name: "Business Websites", price: "₱3,999", note: "Final quotation depends on content, features, and integrations.", formValue: "Business Website" },
  { id: "corporate", name: "Corporate / Internal Systems", price: "₱4,499", note: "Final quotation depends on system functionality and scope.", formValue: "Corporate / Internal System" },
  { id: "community", name: "Community / Organization Websites", price: "₱4,999", note: "Final quotation depends on inclusions and project requirements.", formValue: "Community / Organization Website" },
];

export const IMG_DIR = "/images/";
export const IMG_EXT = "png"; // put screenshots at public/images/<slug>.png

export type Project = { name: string; slug: string; url: string; cat: string; desc: string };
const P = (name: string, slug: string, cat: string, desc: string): Project => ({
  name, slug, url: `https://${slug}.lhimf.online/`, cat, desc,
});

export const PROJECTS: Project[] = [
  P("Barangay Cofradia", "barangaycofradia", "community", "A digital platform for presenting community information and supporting organizational needs."),
  P("Concentrix Logbook", "concentrixlogbook", "corporate", "An example of a digital logbook and internal workflow-oriented project."),
  P("SariHub", "sarihub", "business", "A business-oriented web project demonstrating an online brand presence."),
  P("Boss D Hair Studio", "bossdhairstudio", "business", "A business website example for a hair studio."),
  P("Jhon & Mart Found His Gypsy", "jhonmartfoundhisgypsy", "event", "An event invitation website example."),
  P("LHIMF7", "lhimf7", "event", "An event invitation website example."),
  P("Dan and Abi", "danandabi", "event", "An event invitation website example."),
  P("Abi21", "abi21", "event", "An event invitation website example."),
  P("Sanjay Portfolio", "sanjay", "portfolio", "A personal portfolio website for showcasing work and professional information."),
  P("Dan Portfolio", "dan", "portfolio", "A personal portfolio website focused on personal branding and professional presentation."),
];

export const TECH: [string, string, string[]][] = [
  ["Frontend Development", "Modern front-end technologies and frameworks for building responsive digital experiences.", ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS"]],
  ["Programming & Databases", "Programming languages, SQL, and database tools for application development and data management.", ["Java", "PHP", "C++", "SQL", "Oracle Database", "Oracle SQL Developer"]],
  ["Development & Deployment", "Tools and practices used to develop, version, deploy, and connect modern applications.", ["Git", "GitHub", "Vercel", "REST APIs", "Responsive Web Design"]],
];

export const STEPS: [string, string][] = [
  ["Tell Me Your Idea", "Share your website concept, goals, preferred design, and required features."],
  ["Discuss the Requirements", "Review the scope, design direction, pages, integrations, and functionality."],
  ["Receive a Quotation", "Receive a project-specific quote based on the agreed requirements and inclusions."],
  ["Approve & Begin", "Proceed after the scope, price, timeline, and payment arrangements are agreed upon."],
  ["Review & Launch", "Review the completed work, confirm agreed requirements, and arrange deployment and handover."],
];

export const FEATS = [
  "Landing page", "About page", "Services page", "Portfolio / Gallery", "Contact form",
  "Booking or inquiry system", "Authentication / Login", "Admin dashboard", "Database integration",
  "Payment integration", "Custom functionality", "Not sure yet",
];

export const REVIEWS = [
  "Working with LHIMF Dev helped us turn our idea into a website that reflects what we wanted to present online.",
  "Clear communication from the first message to launch. The site feels clean and easy to use.",
  "I shared my requirements and the design matched the direction I wanted. Simple and professional.",
  "Easy to discuss ideas with, and the final page worked well on both phone and laptop.",
].map((text, i) => ({ name: "Sample Client " + (i + 1), text, sample: true }));
