"use client";
import { useEffect, useRef } from "react";

export default function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      if (ref.current)
        ref.current.style.transform = `scaleX(${window.scrollY / Math.max(1, h.scrollHeight - window.innerHeight)})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="bar" ref={ref} />;
}
