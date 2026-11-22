import Link from "next/link";
import { Home } from "@/components/Icons";
import { heroImages, type NavLink } from "@/lib/content";
import CrumbMenu from "./CrumbMenu";

type Props = {
  section: string;
  sectionHref: string;
  tagline?: string;
  current: string;
  siblings?: NavLink[];
};

export default function SubVisual({ section, sectionHref, tagline = "Let's Make Zero Accidents", current, siblings = [] }: Props) {
  return (
    <div className="sub-visual" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url(${heroImages[1]})` }}>
      <div className="inner vis-txt">
        <p className="vis-tit"><span>{section.toUpperCase()}</span></p>
        <p className="vis-em"><span>{tagline}</span></p>
      </div>
      <nav className="crumb" aria-label="Breadcrumb">
        <div className="inner">
          <Link href="/" aria-label="Home"><Home /></Link>
          <span className="dot" aria-hidden />
          <Link href={sectionHref}>{section.toUpperCase()}</Link>
          <span className="dot" aria-hidden />
          <CrumbMenu current={current} siblings={siblings} />
        </div>
      </nav>
    </div>
  );
}
