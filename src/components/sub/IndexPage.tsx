import Link from "next/link";
import { firstParagraph, type NavLink, type Page } from "@/lib/content";
import SubVisual from "./SubVisual";

type Props = { section: string; href: string; title: string; intro: string; pages: Page[]; siblings: NavLink[] };

export default function IndexPage({ section, href, title, intro, pages, siblings }: Props) {
  return (
    <>
      <SubVisual section={section} sectionHref={href} current={title} siblings={siblings} />
      <div className="sub-wrap inner">
        <div className="sub-title">
          <h1 data-reveal>{title}</h1>
          <p data-reveal>{intro}</p>
        </div>
        <ul className="feature-list">
          {pages.map((p) => (
            <li key={p.slug} data-reveal>
              <Link href={`${href}/${p.slug}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.images[0]} alt="" loading="lazy" />
                <h2>{p.name}</h2>
              </Link>
              <p>{firstParagraph(p)}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
