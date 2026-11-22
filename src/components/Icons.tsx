type P = { className?: string };
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ArrowRight = (p: P) => (<svg {...base} {...p}><path d="M4 12h16M14 6l6 6-6 6" /></svg>);
export const ArrowLeft = (p: P) => (<svg {...base} {...p}><path d="M20 12H4M10 6l-6 6 6 6" /></svg>);
export const ArrowUp = (p: P) => (<svg {...base} {...p}><path d="M12 20V4M6 10l6-6 6 6" /></svg>);
export const Chevron = (p: P) => (<svg {...base} {...p}><path d="m6 9 6 6 6-6" /></svg>);
export const ChevronLeft = (p: P) => (<svg {...base} {...p}><path d="m15 5-7 7 7 7" /></svg>);
export const ChevronRight = (p: P) => (<svg {...base} {...p}><path d="m9 5 7 7-7 7" /></svg>);
export const Search = (p: P) => (<svg {...base} {...p}><circle cx="11" cy="11" r="7.5" /><path d="m17 17 4 4" /></svg>);
export const Close = (p: P) => (<svg {...base} {...p}><path d="M5 5l14 14M19 5 5 19" /></svg>);
export const Menu = (p: P) => (<svg {...base} {...p} viewBox="0 0 30 24"><path d="M1 4h28M9 12h20M1 20h28" /></svg>);
export const Phone = (p: P) => (<svg {...base} {...p}><path d="M21 16.5v3a1.5 1.5 0 0 1-1.6 1.5A17.5 17.5 0 0 1 3 4.6 1.5 1.5 0 0 1 4.5 3h3a1.5 1.5 0 0 1 1.5 1.3c.1.9.3 1.8.6 2.6a1.5 1.5 0 0 1-.3 1.6L8 9.8a14 14 0 0 0 6.2 6.2l1.3-1.3a1.5 1.5 0 0 1 1.6-.3c.8.3 1.7.5 2.6.6a1.5 1.5 0 0 1 1.3 1.5Z" /></svg>);
export const Mail = (p: P) => (<svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3.5 6 8.5 7 8.5-7" /></svg>);
export const Chat = (p: P) => (<svg {...base} {...p}><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.6-5.2A8.5 8.5 0 1 1 21 11.5Z" /></svg>);
export const Pin = (p: P) => (<svg {...base} {...p}><path d="M12 21s7-6.1 7-11.5a7 7 0 1 0-14 0C5 14.9 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const Clock = (p: P) => (<svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>);
export const Home = (p: P) => (<svg {...base} {...p}><path d="m3 11 9-7 9 7M5.5 9.5V20h13V9.5" /></svg>);
export const Play = (p: P) => (<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}><path d="M8 5.5v13l11-6.5-11-6.5Z" /></svg>);
export const Plus = (p: P) => (<svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>);
