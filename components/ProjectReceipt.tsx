
"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

export type ProjectRequest = {
  name: string;
  email: string;
  org: string;
  cat: string;
  budget: string;
  ref: string;
  desc: string;
  features: string[];
};

const CONTACTS = {
  email: "lhimfdev@gmail.com",
  facebook: "https://www.facebook.com/profile.php?id=61595064296933",
  instagram: "https://www.instagram.com/lhimf.dev/",
};

export default function ProjectReceipt({
  request,
  onEdit,
}: {
  request: ProjectRequest;
  onEdit: () => void;
}) {
  const [printing, setPrinting] = useState(false);

  const [reference] = useState(
    () => `LHIMF-${Date.now().toString().slice(-8)}`
  );

  const [requestDate] = useState(() => new Date());

  const formattedDate = requestDate.toLocaleString();

  const receiptText = [
    "LHIMF DEV — PROJECT REQUEST",
    "--------------------------------",
    `Reference: ${reference}`,
    `Date: ${formattedDate}`,
    "",
    `Name: ${request.name}`,
    `Email: ${request.email}`,
    `Organization: ${request.org || "-"}`,
    `Category: ${request.cat}`,
    `Budget: ${request.budget || "Open to discussion"}`,
    `Reference Website: ${request.ref || "-"}`,
    "",
    "Requested Features:",
    ...(request.features.length
      ? request.features.map((feature) => `- ${feature}`)
      : ["- No features selected"]),
    "",
    "Project Description:",
    request.desc || "No description provided",
    "",
    "This is a project request summary, not a payment receipt.",
    `Contact: ${CONTACTS.email}`,
  ].join("\n");

  function downloadReceipt() {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;

    let y = 20;

    function addPageIfNeeded(requiredHeight = 10) {
      if (y + requiredHeight > pageHeight - 20) {
        pdf.addPage();
        y = 20;
      }
    }

    function addDivider() {
      addPageIfNeeded(6);
      pdf.setDrawColor(210, 210, 210);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 7;
    }

    function addText(
      text: string,
      options?: {
        size?: number;
        bold?: boolean;
        gap?: number;
      }
    ) {
      const size = options?.size ?? 10;
      const gap = options?.gap ?? 2;

      pdf.setFont("helvetica", options?.bold ? "bold" : "normal");
      pdf.setFontSize(size);

      const lines = pdf.splitTextToSize(text, contentWidth);
      const lineHeight = size * 0.45 + 1.5;
      const blockHeight = lines.length * lineHeight;

      addPageIfNeeded(blockHeight + gap);

      pdf.text(lines, margin, y);
      y += blockHeight + gap;
    }

    // Header
    pdf.setFillColor(20, 20, 20);
    pdf.rect(0, 0, pageWidth, 43, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(19);
    pdf.text("LHIMF DEV", margin, 19);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text("PROJECT REQUEST SUMMARY", margin, 27);

    pdf.setFontSize(8);
    pdf.text("PROJECT INQUIRY DOCUMENT", margin, 34);

    pdf.setTextColor(30, 30, 30);
    y = 54;

    addText("PROJECT REFERENCE", {
      size: 8,
      bold: true,
      gap: 2,
    });

    addText(reference, {
      size: 15,
      bold: true,
      gap: 2,
    });

    addText(`Prepared on ${formattedDate}`, {
      size: 9,
      gap: 5,
    });

    addDivider();

    addText("CLIENT INFORMATION", {
      size: 11,
      bold: true,
      gap: 4,
    });

    const clientDetails: [string, string][] = [
      ["Name", request.name],
      ["Email", request.email],
      ["Organization", request.org || "-"],
      ["Project type", request.cat],
      ["Budget", request.budget || "Open to discussion"],
      ["Reference website", request.ref || "-"],
    ];

    for (const [label, value] of clientDetails) {
      addText(`${label}: ${value}`, {
        size: 10,
        gap: 2,
      });
    }

    y += 3;
    addDivider();

    addText("PROJECT DESCRIPTION", {
      size: 11,
      bold: true,
      gap: 4,
    });

    addText(request.desc || "No description provided.", {
      size: 10,
      gap: 5,
    });

    addDivider();

    addText("REQUESTED FEATURES", {
      size: 11,
      bold: true,
      gap: 4,
    });

    const features = request.features.length
      ? request.features
      : ["No features selected"];

    for (const feature of features) {
      addText(`- ${feature}`, {
        size: 10,
        gap: 2,
      });
    }

    y += 4;
    addDivider();

    addText("NEXT STEPS", {
      size: 11,
      bold: true,
      gap: 4,
    });

    addText(
      "Contact LHIMF to discuss your requirements, confirm the project scope, and agree on the timeline and pricing.",
      {
        size: 10,
        gap: 5,
      }
    );

    addDivider();

    addText(
      "This document is a project inquiry summary, not an invoice or proof of payment. The request has not been submitted automatically.",
      {
        size: 8,
        gap: 4,
      }
    );

    addText(`Contact: ${CONTACTS.email}`, {
      size: 9,
      bold: true,
      gap: 2,
    });

    addText("https://www.lhimf.online/", {
      size: 9,
      gap: 2,
    });

    // Footer on every page
    const pageCount = pdf.getNumberOfPages();

    for (let page = 1; page <= pageCount; page++) {
      pdf.setPage(page);
      pdf.setDrawColor(210, 210, 210);
      pdf.line(
        margin,
        pageHeight - 13,
        pageWidth - margin,
        pageHeight - 13
      );

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);

      pdf.text("LHIMF DEV | Project Inquiry", margin, pageHeight - 7);

      pdf.text(
        `Page ${page} of ${pageCount}`,
        pageWidth - margin,
        pageHeight - 7,
        { align: "right" }
      );
    }

    pdf.save(`${reference}-project-request.pdf`);
  }

  function printReceipt() {
    if (printing) return;

    setPrinting(true);

    window.setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 5000);
  }

  function openEmail() {
    const subject = `LHIMF Project Request — ${request.name}`;

    const body = [
      "Hello LHIMF,",
      "",
      "I would like to discuss my project request.",
      "",
      receiptText,
    ].join("\n");

    const mailtoUrl = `mailto:${CONTACTS.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  }

  function openFacebook() {
    window.open(
      CONTACTS.facebook,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <section
      className={`project-receipt ${printing ? "is-printing" : ""}`}
    >
      <div className="receipt-heading">
        <p className="receipt-eyebrow">
          LHIMF DEV · PROJECT SERVICES
        </p>

        <h2>Your request is ready.</h2>

        <p>
          Review your project details, download a PDF, or contact us
          directly.
        </p>
      </div>

      <div className="receipt-printer" aria-hidden="true">
        <div className="printer-top">
          <span />
          <span />
          <span />
        </div>

        <div className="printer-slot" />

        <article className="receipt-paper">
          <div className="receipt-brand">
            <div className="receipt-brand-logo">
              <img
                src="/images/logo.png"
                alt="LHIMF DEV Logo"
                className="receipt-logo"
              />

              <span>PROJECT REQUEST</span>
            </div>
          </div>

          <div className="receipt-success">
            <span className="success-check">✓</span>

            <div>
              <strong>Request Prepared</strong>
              <span>Not yet submitted to LHIMF</span>
            </div>
          </div>

          <div className="receipt-reference">
            <span>REFERENCE NUMBER</span>
            <strong>{reference}</strong>
            <span>{requestDate.toLocaleDateString()}</span>
          </div>

          <div className="receipt-rule" />

          <div className="receipt-row">
            <span>Client</span>
            <strong>{request.name}</strong>
          </div>

          <div className="receipt-row">
            <span>Email</span>
            <strong>{request.email}</strong>
          </div>

          <div className="receipt-row">
            <span>Project type</span>
            <strong>{request.cat}</strong>
          </div>

          <div className="receipt-row">
            <span>Budget</span>
            <strong>{request.budget || "Discuss"}</strong>
          </div>

          {request.org && (
            <div className="receipt-row">
              <span>Organization</span>
              <strong>{request.org}</strong>
            </div>
          )}

          {request.ref && (
            <div className="receipt-row">
              <span>Reference website</span>
              <strong>{request.ref}</strong>
            </div>
          )}

          <div className="receipt-rule" />

          <div className="receipt-description">
            <span>PROJECT DESCRIPTION</span>
            <p>{request.desc}</p>
          </div>

          <div className="receipt-description">
            <span>REQUESTED FEATURES</span>

            {request.features.length > 0 ? (
              <ul>
                {request.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            ) : (
              <p>No features selected</p>
            )}
          </div>

          <div className="receipt-footer">
            <strong>LET&apos;S BUILD SOMETHING.</strong>
            <span>{CONTACTS.email}</span>
            <span>{reference}</span>
            <span>Project inquiry summary — not a payment receipt</span>
          </div>
        </article>
      </div>

      <div className="receipt-message">
        <h3>Project details prepared</h3>

        <p>
          Choose an action below to keep a copy or send your inquiry
          to LHIMF.
        </p>
      </div>

      <div className="receipt-actions">
        <button
          type="button"
          className="receipt-button receipt-button-primary"
          onClick={printReceipt}
          disabled={printing}
        >
          <span aria-hidden="true">⎙</span>
          {printing ? "Preparing print..." : "Print Receipt"}
        </button>

        <button
          type="button"
          className="receipt-button"
          onClick={downloadReceipt}
        >
          <span aria-hidden="true">↓</span>
          Download PDF
        </button>

        <button
          type="button"
          className="receipt-button"
          onClick={openEmail}
        >
          Email LHIMF
        </button>

        <button
          type="button"
          className="receipt-button"
          onClick={openFacebook}
        >
          Facebook
        </button>

        <a
          className="receipt-button"
          href={CONTACTS.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>

        <button
          type="button"
          className="receipt-button receipt-button-text"
          onClick={onEdit}
        >
          ← Edit project details
        </button>
      </div>

      <p className="receipt-disclaimer">
        This document is a project inquiry summary, not an invoice or
        proof of payment. Your request is not delivered until you
        contact LHIMF or configure a submission endpoint.
      </p>
    </section>
  );
}
