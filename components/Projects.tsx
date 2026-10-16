"use client";
import { useState, type CSSProperties } from "react";
import { CATS, IMG_DIR, IMG_EXT, PROJECTS, type Project } from "@/lib/data";
import Reveal from "./Reveal";

function Preview({ p }: { p: Project }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="prev">
      <span>{p.name}</span>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${IMG_DIR}${p.slug}.${IMG_EXT}`}
          alt={`Screenshot of ${p.name}`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export default function Projects() {
  const [cur, setCur] = useState("all");
  const filters = [{ id: "all", name: "All" }, ...CATS];

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects by category">
        {filters.map((c) => (
          <button key={c.id} type="button" aria-pressed={c.id === cur} onClick={() => setCur(c.id)}>
            {c.name.replace(" Websites", "").replace(" & Invitation", "")}
          </button>
        ))}
      </div>
      <div className="cards">
        {PROJECTS.filter((p) => cur === "all" || p.cat === cur).map((p, i) => {
          const c = CATS.find((x) => x.id === p.cat)!;
          return (
            <Reveal key={`${cur}-${p.slug}`} className="card rv" style={{ "--i": i } as CSSProperties}>
              <Preview p={p} />
              <div className="meta">
                <span>{c.name}</span>
                <span>From {c.price}</span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <p className="note">Starting price only. {c.note}</p>
              <div className="links">
                <a href={p.url} target="_blank" rel="noopener noreferrer">View Live Website ↗</a>
                <a
                  href="#contact"
                  onClick={() => window.dispatchEvent(new CustomEvent("select-category", { detail: c.formValue }))}
                >
                  Build Something Similar →
                </a>
              </div>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
