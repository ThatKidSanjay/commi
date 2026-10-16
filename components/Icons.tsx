const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({ html, solid }: { html: string; solid?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...(solid ? { fill: "currentColor" } : stroke)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

const badge = (t: string) =>
  `<rect x="1.5" y="1.5" width="21" height="21" rx="3"/><text x="12" y="15.8" text-anchor="middle" font-size="${t.length > 2 ? 7.5 : 10}" font-weight="800" fill="currentColor" stroke="none" font-family="Arial,sans-serif">${t}</text>`;

const BADGES: Record<string, string> = {
  HTML5: "H5", CSS3: "C3", JavaScript: "JS", TypeScript: "TS", Java: "Java", PHP: "php",
  "C++": "C++", SQL: "SQL", "Oracle Database": "DB", "Oracle SQL Developer": "SD",
  Git: "Git", GitHub: "GH", "REST APIs": "API", "Responsive Web Design": "RWD",
};

const TECH_SVG: Record<string, { html: string; solid?: boolean }> = {
  "React.js": {
    html: '<ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/>',
  },
  "Next.js": { html: '<circle cx="12" cy="12" r="10.5"/><path d="M9 16V8l7 9M16 8v4"/>' },
  Vercel: { html: '<path d="M12 3 22 20H2z" fill="currentColor"/>' },
  "Tailwind CSS": {
    solid: true,
    html: '<path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>',
  },
};

export function TechIcon({ name }: { name: string }) {
  if (BADGES[name]) return <Svg html={badge(BADGES[name])} />;
  const t = TECH_SVG[name];
  return t ? <Svg html={t.html} solid={t.solid} /> : null;
}

const SOCIAL_SVG: Record<string, string> = {
  Facebook: '<circle cx="12" cy="12" r="10.5"/><path d="M13.5 21v-8h2.7M13.5 13h-2.2M13.5 13V9.8c0-1.3.7-2 2-2h1.2"/>',
  Instagram: '<rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r=".8" fill="currentColor"/>',
  TikTok: '<path d="M14 3v11.5a3.6 3.6 0 1 1-3.6-3.6M14 3c.4 2.6 2 4.2 5 4.4"/>',
  Email: '<rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3 7 9 6.5L21 7"/>',
};

export function SocialIcon({ name }: { name: string }) {
  return <Svg html={SOCIAL_SVG[name] ?? ""} />;
}

export function ThumbIcon() {
  return <Svg html='<path d="M7 11v9H4v-9zM7 11l4-8c1.5 0 2.5 1 2.2 2.6L12.8 9H19a2 2 0 0 1 2 2.4l-1.3 6.6a2 2 0 0 1-2 1.6H7"/>' />;
}
