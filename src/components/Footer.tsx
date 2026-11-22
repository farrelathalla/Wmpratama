import Link from "next/link";
import { SITE } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="inner">
        <div className="ft-left">
          <Link href="/" aria-label="Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ft-logo" src="/images/brand/logo.webp" alt="WMP Winarto Mitra Pratama" width={154} height={80} loading="lazy" />
          </Link>
          <div className="ft-info">
            <strong>{SITE.name}</strong>
            <p>{SITE.connect}</p>
            <p><span>Address. {SITE.address}</span></p>
            <p>
              <span>Tel. <a href={SITE.phoneHref}>{SITE.phone}</a></span>
              <span>Email. <a href={`mailto:${SITE.email}`}>{SITE.email}</a></span>
            </p>
            <p><span>Hours. {SITE.hours}</span></p>
          </div>
        </div>
        <div className="ft-right">
          <nav aria-label="Footer">
            <Link href="/products">Products</Link>
            <Link href="/services">Services</Link>
            <Link href="/training">Training</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <p className="copy">© {new Date().getFullYear()} WMPRATAMA. ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  );
}
