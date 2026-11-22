"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "@/components/Icons";

export default function ImageViewer({ images, alt, fit = "cover" }: { images: string[]; alt: string; fit?: "cover" | "contain" }) {
  const [index, setIndex] = useState(0);
  const [origin, setOrigin] = useState<string | null>(null);
  const go = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length);

  return (
    <div className="viewer">
      <div
        className={`viewer-main${origin ? " is-zoom" : ""}`}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
        }}
        onMouseLeave={() => setOrigin(null)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={images[index]} src={images[index]} alt={`${alt}, image ${index + 1}`} style={{ objectFit: fit, transformOrigin: origin ?? "center" }} />
      </div>
      {images.length > 1 && (
        <div className="viewer-thumbs">
          <button type="button" className="nav" onClick={() => go(-1)} aria-label="Previous image"><ChevronLeft /></button>
          <div className="list">
            {images.map((src, i) => (
              <button key={src} type="button" className={i === index ? "is-on" : undefined} onClick={() => setIndex(i)} aria-label={`Show image ${i + 1}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
          <button type="button" className="nav" onClick={() => go(1)} aria-label="Next image"><ChevronRight /></button>
        </div>
      )}
    </div>
  );
}
