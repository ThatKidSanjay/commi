
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CONFIG, FEATS } from "@/lib/data";

const CATEGORIES = [
  "Business Website",
  "Portfolio Website",
  "Event / Invitation Website",
  "Community / Organization Website",
  "Corporate / Internal System",
  "Other / Custom Project",
];

const BUDGETS = [
  "Below ₱1,000",
  "₱1,000–₱2,999",
  "₱3,000–₱4,999",
  "₱5,000–₱9,999",
  "₱10,000+",
  "Open to discussion",
];

function normalizeUrl(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) return "";

  return /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(normalizeUrl(value));

    return (
      ["http:", "https:"].includes(url.protocol) &&
      url.hostname.includes(".") &&
      !url.hostname.startsWith(".") &&
      !url.hostname.endsWith(".")
    );
  } catch {
    return false;
  }
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [cat, setCat] = useState("");
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const handleCategory = (event: Event) => {
      setCat((event as CustomEvent<string>).detail);
    };

    window.addEventListener("select-category", handleCategory);

    return () => {
      window.removeEventListener("select-category", handleCategory);
    };
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = formRef.current;

    if (!form || busy) return;

    const fd = new FormData(form);

    // Honeypot spam protection.
    if (String(fd.get("hp") ?? "").trim()) return;

    const rawRef = String(fd.get("ref") ?? "").trim();

    const d = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      org: String(fd.get("org") ?? "").trim(),
      cat,
      budget: String(fd.get("budget") ?? ""),
      ref: normalizeUrl(rawRef),
      desc: String(fd.get("desc") ?? "").trim(),
      features: fd.getAll("feat").map(String),
    };

    const next: Record<string, string> = {};

    if (!d.name) {
      next.name = "Please enter your name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) {
      next.email = "Please enter a valid email address.";
    }

    if (!d.cat) {
      next.cat = "Please choose a website category.";
    }

    if (!d.desc) {
      next.desc = "Please describe your project.";
    }

    // Optional field: validate only when a value is provided.
    if (rawRef && !isValidUrl(rawRef)) {
      next.ref = "Enter a valid website address, such as www.example.com.";
    }

    setErrs(next);

    if (Object.keys(next).length > 0) {
      setStatus("");
      return;
    }

    setBusy(true);
    setStatus("");

    try {
      if (CONFIG.endpoint) {
        const response = await fetch(CONFIG.endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(d),
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        setStatus(
          "Thank you! Your request has been sent. I'll reply by email."
        );

        form.reset();
        setCat("");
        setErrs({});
      } else {
        const body = [
          `Name: ${d.name}`,
          `Email: ${d.email}`,
          `Organization: ${d.org || "-"}`,
          `Category: ${d.cat}`,
          `Budget: ${d.budget || "-"}`,
          `Features: ${d.features.join(", ") || "-"}`,
          `Reference Website: ${d.ref || "-"}`,
          "",
          d.desc,
        ].join("\n");

        const mailto =
          `mailto:${CONFIG.email}` +
          `?subject=${encodeURIComponent("Custom Website Quote Request")}` +
          `&body=${encodeURIComponent(body)}`;

        window.location.href = mailto;

        setStatus(
          "Your email app should open with your request prefilled. Please press Send in your email app to submit it."
        );
      }
    } catch {
      setStatus(
        `Something went wrong. Please email ${CONFIG.email} directly.`
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      ref={formRef}
      id="form"
      noValidate
      onSubmit={onSubmit}
    >
      <div>
        <label htmlFor="name">Full Name *</label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Enter your full name"
          required
          aria-invalid={!!errs.name}
          aria-describedby={errs.name ? "name-error" : undefined}
        />
        <div className="err" id="name-error">
          {errs.name}
        </div>
      </div>

      <div>
        <label htmlFor="email">Email Address *</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          aria-invalid={!!errs.email}
          aria-describedby={errs.email ? "email-error" : undefined}
        />
        <div className="err" id="email-error">
          {errs.email}
        </div>
      </div>

      <div>
        <label htmlFor="org">Business or Organization Name</label>
        <input
          id="org"
          name="org"
          placeholder="Your business or organization"
        />
      </div>

      <div>
        <label htmlFor="cat">Website Category *</label>
        <select
          id="cat"
          name="cat"
          required
          value={cat}
          onChange={(e) => {
            setCat(e.target.value);
            setErrs((prev) => ({ ...prev, cat: "" }));
          }}
          aria-invalid={!!errs.cat}
          aria-describedby={errs.cat ? "cat-error" : undefined}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="err" id="cat-error">
          {errs.cat}
        </div>
      </div>

      <div>
        <label htmlFor="budget">Estimated Budget</label>
        <select
          id="budget"
          name="budget"
          defaultValue=""
        >
          <option value="">Select your budget (optional)</option>
          {BUDGETS.map((budget) => (
            <option key={budget} value={budget}>
              {budget}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend>Required Pages and Features</legend>
        <div className="checks">
          {FEATS.map((feature) => (
            <label key={feature}>
              <input
                type="checkbox"
                name="feat"
                value={feature}
              />
              {feature}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="ref">
          Preferred Style or Reference Website{" "}
          <span>(Optional)</span>
        </label>
        <input
          id="ref"
          name="ref"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="www.example.com"
          aria-invalid={!!errs.ref}
          aria-describedby="ref-hint ref-error"
          onChange={() => {
            if (errs.ref) {
              setErrs((prev) => ({ ...prev, ref: "" }));
            }
          }}
        />
        <p id="ref-hint" className="field-hint">
          Have a website design you like? Share its URL here.
        </p>
        <div className="err" id="ref-error">
          {errs.ref}
        </div>
      </div>

      <div>
        <label htmlFor="desc">Project Description *</label>
        <textarea
          id="desc"
          name="desc"
          rows={5}
          placeholder="Tell me about your website, its purpose, and the features you need..."
          required
          aria-invalid={!!errs.desc}
          aria-describedby={errs.desc ? "desc-error" : undefined}
        />
        <div className="err" id="desc-error">
          {errs.desc}
        </div>
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor="hp">
          Leave empty
          <input
            id="hp"
            name="hp"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <button
        className="btn"
        id="submit"
        type="submit"
        disabled={busy}
      >
        {busy ? "Sending..." : "Request My Custom Quote →"}
      </button>

      <div
        className="status"
        id="status"
        role="status"
        aria-live="polite"
        style={{ display: status ? "block" : "none" }}
      >
        {status}
      </div>
    </form>
  );
}
