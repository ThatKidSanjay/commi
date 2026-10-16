import type { CSSProperties } from "react";
import { CONFIG } from "@/lib/data";
import { SocialIcon } from "./Icons";

export default function Social({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={`social ${className}`.trim()} style={style}>
      {CONFIG.social.map(([name, href]) => {
        const ext = href.startsWith("http");
        return (
          <a
            key={name}
            aria-label={name}
            href={href}
            {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <SocialIcon name={name} />
            <span>
              {name}
              {ext ? " ↗" : ""}
            </span>
          </a>
        );
      })}
    </div>
  );
}
