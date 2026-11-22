"use client";

import { useState } from "react";

export default function PillarTabs({ pillars }: { pillars: { title: string; text: string }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="pillars" data-reveal>
      <div className="tabs" role="tablist" aria-label="Goals, mission and commitment">
        {pillars.map((p, i) => (
          <button key={p.title} type="button" role="tab" aria-selected={i === active} className={i === active ? "is-on" : undefined} onClick={() => setActive(i)}>
            {p.title}
          </button>
        ))}
      </div>
      <p key={active} className="pillar-text" role="tabpanel">{pillars[active].text}</p>
    </div>
  );
}
