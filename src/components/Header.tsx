"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { NavItem, SearchEntry } from "@/lib/content";
import { Chat, Chevron, Close, Mail, Menu, Phone, Search } from "./Icons";

type Site = { phone: string; phoneHref: string; whatsapp: string; whatsappHref: string; email: string };
type SiteMapState = "closed" | "open" | "closing";

export default function Header({ nav, search, site }: { nav: NavItem[]; search: SearchEntry[]; site: Site }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [siteMap, setSiteMap] = useState<SiteMapState>("closed");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accordion, setAccordion] = useState<string | null>(null);
  // One source of truth for the desktop dropdown, so only one can ever be open.
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const openDropdown = (href: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(href);
  };
  const closeDropdownSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  };
  const dismissDropdown = () => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(null);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  };

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSearchOpen(false);
    setQuery("");
    setSiteMap("closed");
    setMobileOpen(false);
    setAccordion(null);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    const locked = siteMap === "open" || mobileOpen;
    document.documentElement.classList.toggle("is-locked", locked);
    return () => document.documentElement.classList.remove("is-locked");
  }, [siteMap, mobileOpen]);

  const closeSiteMap = () => {
    setSiteMap("closing");
    window.setTimeout(() => setSiteMap("closed"), 400);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      setSearchOpen(false);
      setMobileOpen(false);
      setSiteMap((s) => {
        if (s !== "open") return s;
        window.setTimeout(() => setSiteMap("closed"), 400);
        return "closing";
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return search.filter((s) => `${s.title} ${s.meta}`.toLowerCase().includes(q)).slice(0, 6);
  }, [query, search]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const closeAll = () => {
    setSearchOpen(false);
    setMobileOpen(false);
    setSiteMap("closed");
  };

  return (
    <>
      <header className={`header${scrolled ? " is-fixed" : ""}${searchOpen ? " is-search" : ""}`}>
        <div className="inner">
          <div className="hd-top">
            <a href={site.whatsappHref} target="_blank" rel="noreferrer"><Chat />{site.whatsapp}</a>
            <span className="line" />
            <a href={site.phoneHref}><Phone />{site.phone}</a>
            <span className="line" />
            <a href={`mailto:${site.email}`}><Mail />{site.email}</a>
          </div>
          <div className="hd-bot">
            <Link href="/" className="logo" aria-label="Winarto Mitra Pratama, home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/brand/logo.webp" alt="WMP Winarto Mitra Pratama" width={154} height={80} />
            </Link>
            <div className="hd-right">
              <nav aria-label="Main">
                <ul className="gnb">
                  {nav.map((item) => (
                    <li
                      key={item.href}
                      className={[isActive(item.href) && "is-current", openMenu === item.href && "is-open"].filter(Boolean).join(" ") || undefined}
                      onMouseEnter={() => openDropdown(item.href)}
                      onMouseLeave={closeDropdownSoon}
                      onFocus={(e) => {
                        // Keyboard focus only: a mouse click must not pin the dropdown open.
                        if (e.target.matches(":focus-visible")) openDropdown(item.href);
                      }}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                          setOpenMenu((current) => (current === item.href ? null : current));
                        }
                      }}
                    >
                      <Link href={item.href} onClick={dismissDropdown} aria-haspopup={item.children ? "true" : undefined} aria-expanded={item.children ? openMenu === item.href : undefined}>{item.label}</Link>
                      {item.children && (
                        <ul className="gnb-sub">
                          {item.children.map((c, i) => (
                            <li key={c.href} style={{ "--i": i } as React.CSSProperties}>
                              <Link href={c.href} title={c.label} onClick={dismissDropdown}>{c.label}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="hd-icons">
                <button type="button" onClick={() => setSearchOpen((v) => !v)} aria-label="Search" aria-expanded={searchOpen}><Search /></button>
                <button type="button" className="only-desk" onClick={() => setSiteMap("open")} aria-label="Open site map"><Menu /></button>
                <button type="button" className="only-mob" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu /></button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={`hd-search${searchOpen ? " is-on" : ""}`} aria-hidden={!searchOpen}>
        <button type="button" className="search-close" onClick={() => setSearchOpen(false)} aria-label="Close search" tabIndex={searchOpen ? 0 : -1}><Close /></button>
        <div className="cont">
          <strong>Search</strong>
          <div className="search-field">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, services or training" aria-label="Search" tabIndex={searchOpen ? 0 : -1} />
            <Search />
            {query.trim() && (
              <ul className="search-results">
                {results.length === 0 && <li className="none">No results for “{query.trim()}”.</li>}
                {results.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} onClick={closeAll}><b>{r.title}</b><span>{r.meta}</span></Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {siteMap !== "closed" && (
        <div className={`site-map ${siteMap === "open" ? "is-active" : "is-hide"}`} role="dialog" aria-modal="true" aria-label="Site map">
          <div className="inner">
            <div className="site-map-top">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/brand/logo.webp" alt="WMP" width={154} height={80} />
              <button type="button" onClick={closeSiteMap} aria-label="Close site map" autoFocus><Close /></button>
            </div>
            <div className="site-map-list">
              {nav.map((item) => (
                <div key={item.href} className="col">
                  <Link href={item.href} className="tit" onClick={closeAll}>{item.label}</Link>
                  {item.children && (
                    <ul>
                      {item.children.map((c) => (
                        <li key={c.href}><Link href={c.href} onClick={closeAll}>{c.label}</Link></li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
          <span className="site-map-mark" aria-hidden>WMP</span>
        </div>
      )}

      <div className={`mob-menu${mobileOpen ? " is-on" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mob-top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/brand/logo.webp" alt="WMP" width={154} height={80} />
          <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu" tabIndex={mobileOpen ? 0 : -1}><Close /></button>
        </div>
        <ul className="mob-nav">
          {nav.map((item) => (
            <li key={item.href} className={accordion === item.href ? "is-open" : undefined}>
              {item.children ? (
                <>
                  <button type="button" onClick={() => setAccordion((v) => (v === item.href ? null : item.href))} aria-expanded={accordion === item.href} tabIndex={mobileOpen ? 0 : -1}>
                    {item.label}<Chevron />
                  </button>
                  <div className="mob-sub">
                    <div>
                      <Link href={item.href} onClick={closeAll} tabIndex={mobileOpen && accordion === item.href ? 0 : -1}>All {item.label}</Link>
                      {item.children.map((c) => (
                        <Link key={c.href} href={c.href} onClick={closeAll} tabIndex={mobileOpen && accordion === item.href ? 0 : -1}>{c.label}</Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link href={item.href} onClick={closeAll} tabIndex={mobileOpen ? 0 : -1}>{item.label}</Link>
              )}
            </li>
          ))}
        </ul>
        <div className="mob-contact">
          <a href={site.whatsappHref} target="_blank" rel="noreferrer" tabIndex={mobileOpen ? 0 : -1}><Chat />{site.whatsapp}</a>
          <a href={site.phoneHref} tabIndex={mobileOpen ? 0 : -1}><Phone />{site.phone}</a>
          <a href={`mailto:${site.email}`} tabIndex={mobileOpen ? 0 : -1}><Mail />{site.email}</a>
        </div>
      </div>
    </>
  );
}
