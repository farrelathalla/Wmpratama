"use client";

import { ArrowUp } from "./Icons";

export default function TopButton() {
  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };
  return (
    <button type="button" className="top-btn" onClick={toTop} aria-label="Back to top">
      <ArrowUp />
    </button>
  );
}
