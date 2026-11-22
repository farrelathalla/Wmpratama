import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import PillarTabs from "@/components/sub/PillarTabs";
import SubVisual from "@/components/sub/SubVisual";
import { ABOUT, heroImages, products, services, SITE, training } from "@/lib/content";

export const metadata: Metadata = { title: "About Us", description: ABOUT.history };

export default function AboutPage() {
  const areas = [
    { title: "Sales", text: `${products.length} gas detection products for industrial work.`, href: "/products", image: products[1].images[0] },
    { title: "Services", text: services.map((s) => s.name).join(", "), href: "/services", image: services[1].images[0] },
    { title: "Training Facility", text: training.map((t) => t.name).join(", "), href: "/training", image: training[0].images[0] },
  ];
  return (
    <>
      <SubVisual section="About Us" sectionHref="/about" current="About WMP" />
      <div className="sub-wrap inner about">
        <div className="sub-title"><h1 data-reveal>About WMP</h1></div>
        <h2 className="statement" data-reveal>{SITE.name} (WMP)</h2>
        <div className="about-copy">
          <p data-reveal>{ABOUT.history}</p>
          <p data-reveal>{ABOUT.driver}</p>
          <p data-reveal><b>{ABOUT.aim}</b></p>
        </div>
        <div className="about-photo" data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImages[2]} alt="WMP team on an offshore deck" loading="lazy" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="mark" src="/images/brand/logo.webp" alt="" loading="lazy" />
        </div>
        <ol className="timeline">
          <li data-reveal><b>2012</b><span>Started toxic and flammable gas safety training and services.</span></li>
          <li data-reveal><b>2015</b><span>Expanded into gas equipment sales and services along with utility works.</span></li>
        </ol>
        <PillarTabs pillars={ABOUT.pillars} />
        <section className="areas">
          <h2 data-reveal>Key Business Areas</h2>
          <ul className="card-grid">
            {areas.map((a) => (
              <li key={a.title} data-reveal>
                <Link href={a.href}>
                  <span className="img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.image} alt="" loading="lazy" />
                    <b>{a.title}</b>
                  </span>
                  <span className="desc">{a.text}</span>
                  <span className="more">View more <ArrowRight /></span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
