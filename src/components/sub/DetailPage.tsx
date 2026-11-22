import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { firstParagraph, type NavLink, type Page } from "@/lib/content";
import Blocks from "./Blocks";
import ImageViewer from "./ImageViewer";
import SubVisual from "./SubVisual";

type Props = { page: Page; section: string; sectionHref: string; badge: string; siblings: NavLink[]; related: (Page & { href: string })[] };

export default function DetailPage({ page, section, sectionHref, badge, siblings, related }: Props) {
  return (
    <>
      <SubVisual section={section} sectionHref={sectionHref} current={page.name} siblings={siblings} />
      <div className="sub-wrap inner">
        <div className="sub-title"><p className="h" data-reveal>{section}</p></div>
        <article className="thumb-wrap" data-reveal>
          <ImageViewer images={page.images} alt={page.name} />
          <div className="thumb-info">
            <span className="badge">{badge}</span>
            <h1>{page.name}</h1>
            <Blocks blocks={page.blocks} />
            <Link href="/contact" className="view-btn">Contact Us <ArrowRight /></Link>
          </div>
        </article>
        {related.length > 0 && (
          <section className="related">
            <h2 data-reveal>Other {section}</h2>
            <ul className="card-grid">
              {related.map((r) => (
                <li key={r.slug} data-reveal>
                  <Link href={r.href}>
                    <span className="img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.images[0]} alt="" loading="lazy" />
                      <b>{r.name}</b>
                    </span>
                    <span className="desc">{firstParagraph(r)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
