"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CONFIG, FEATS } from "@/lib/data";

const CATEGORIES = [
  "Business Website", "Portfolio Website", "Event / Invitation Website",
  "Community / Organization Website", "Corporate / Internal System", "Other / Custom Project",
];
const BUDGETS = [
  "Below ₱1,000", "₱1,000–₱2,999", "₱3,000–₱4,999", "₱5,000–₱9,999", "₱10,000+", "Open to discussion",
];

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [cat, setCat] = useState("");
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const h = (e: Event) => setCat((e as CustomEvent<string>).detail);
    window.addEventListener("select-category", h);
    return () => window.removeEventListener("select-category", h);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current!;
    const fd = new FormData(form);
    if (fd.get("hp")) return;
    if (busy) return;

    const d = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      org: String(fd.get("org") ?? ""),
      cat,
      budget: String(fd.get("budget") ?? ""),
      ref: String(fd.get("ref") ?? ""),
      desc: String(fd.get("desc") ?? ""),
      features: fd.getAll("feat").map(String),
    };

    const next: Record<string, string> = {};
    if (!d.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) next.email = "Please enter a valid email address.";
    if (!d.cat) next.cat = "Please choose a category.";
    if (!d.desc.trim()) next.desc = "Please describe your project.";
    if (d.ref && !/^https?:\/\/\S+$/.test(d.ref)) next.ref = "Enter a full URL starting with https://";
    setErrs(next);
    if (Object.keys(next).length) return;

    setBusy(true);
    setStatus("");
    try {
      if (CONFIG.endpoint) {
        const r = await fetch(CONFIG.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(d),
        });
        if (!r.ok) throw new Error();
        setStatus("Thank you. Your request was sent. I'll reply by email.");
        form.reset();
        setCat("");
      } else {
        const body = `Name: ${d.name}\nEmail: ${d.email}\nOrganization: ${d.org || "-"}\nCategory: ${d.cat}\nBudget: ${d.budget || "-"}\nFeatures: ${d.features.join(", ") || "-"}\nReference: ${d.ref || "-"}\n\n${d.desc}`;
        window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Custom website quote request")}&body=${encodeURIComponent(body)}`;
        setStatus(
          "Your email app should open with the request prefilled. Press send there to deliver it. (No server endpoint is configured on this page, so nothing was sent automatically.)"
        );
      }
    } catch {
      setStatus("Something went wrong. Please email " + CONFIG.email + " directly.");
    }
    setBusy(false);
  }

  return (
    <form ref={formRef} id="form" noValidate onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Full Name *</label>
        <input id="name" name="name" autoComplete="name" required />
        <div className="err">{errs.name}</div>
      </div>
      <div>
        <label htmlFor="email">Email Address *</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
        <div className="err">{errs.email}</div>
      </div>
      <div>
        <label htmlFor="org">Business or Organization Name</label>
        <input id="org" name="org" />
      </div>
      <div>
        <label htmlFor="cat">Website Category *</label>
        <select id="cat" name="cat" required value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="">Select…</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <div className="err">{errs.cat}</div>
      </div>
      <div>
        <label htmlFor="budget">Estimated Budget</label>
        <select id="budget" name="budget" defaultValue="">
          <option value="">Select…</option>
          {BUDGETS.map((b) => <option key={b}>{b}</option>)}
        </select>
      </div>
      <fieldset>
        <legend>Required Pages and Features</legend>
        <div className="checks">
          {FEATS.map((f) => (
            <label key={f}>
              <input type="checkbox" name="feat" value={f} />
              {f}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="ref">Preferred Style or Reference Website (URL)</label>
        <input id="ref" name="ref" type="url" placeholder="https://" />
        <div className="err">{errs.ref}</div>
      </div>
      <div>
        <label htmlFor="desc">Project Description *</label>
        <textarea id="desc" name="desc" rows={5} required />
        <div className="err">{errs.desc}</div>
      </div>
      <div className="hp" aria-hidden="true">
        <label>
          Leave empty
          <input id="hp" name="hp" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button className="btn" id="submit" type="submit" disabled={busy}>
        {busy ? "Sending…" : "Request My Custom Quote →"}
      </button>
      <div className="status" id="status" role="status" style={{ display: status ? "block" : "none" }}>
        {status}
      </div>
    </form>
  );
}
