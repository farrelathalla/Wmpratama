"use client";

import { useEffect, useMemo, useState } from "react";
import { Close, Play, Plus } from "@/components/Icons";
import type { GalleryItem } from "@/lib/content";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "image", label: "Image" },
  { id: "video", label: "Video" },
];

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<GalleryItem | null>(null);
  const list = useMemo(() => (filter === "all" ? items : items.filter((g) => g.kind === filter)), [filter, items]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.add("is-locked");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("is-locked");
    };
  }, [open]);

  return (
    <div className="inner">
      <div className="tabs gallery-tabs" role="tablist" aria-label="Filter gallery">
        {FILTERS.map((f) => (
          <button key={f.id} type="button" role="tab" aria-selected={f.id === filter} className={f.id === filter ? "is-on" : undefined} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>
      <p className="total-line">Total <b>{list.length}</b></p>
      <ul className="gallery-grid">
        {list.map((g) => (
          <li key={g.title}>
            <button type="button" onClick={() => setOpen(g)} aria-label={`Open ${g.title}`}>
              <span className="img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.image} alt="" loading="lazy" />
                <span className="icon">{g.kind === "video" ? <Play /> : <Plus />}</span>
              </span>
              <span className="tit">{g.title}</span>
            </button>
          </li>
        ))}
      </ul>
      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)}>
          <button type="button" className="lb-close" onClick={() => setOpen(null)} aria-label="Close" autoFocus><Close /></button>
          <figure onClick={(e) => e.stopPropagation()}>
            {open.youtube ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${open.youtube}?autoplay=1&rel=0`}
                title={open.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={open.image} alt={open.title} />
            )}
            <figcaption>{open.title}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
