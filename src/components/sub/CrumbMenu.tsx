"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Chevron } from "@/components/Icons";
import type { NavLink } from "@/lib/content";

export default function CrumbMenu({ current, siblings }: { current: string; siblings: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  if (siblings.length === 0) return <span className="crumb-current">{current}</span>;

  return (
    <div className={`crumb-menu${open ? " is-open" : ""}`} ref={ref}>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span>{current}</span><Chevron />
      </button>
      <ul>
        {siblings.map((s) => (
          <li key={s.href}>
            <Link href={s.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>{s.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
