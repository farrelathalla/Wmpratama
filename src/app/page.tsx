import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import HeroSlider, { type HeroSlide } from "@/components/home/HeroSlider";
import Insights, { type InsightItem } from "@/components/home/Insights";
import ProductShowcase from "@/components/home/ProductShowcase";
import WhatWeDo, { type WhatItem } from "@/components/home/WhatWeDo";
import { ArrowRight } from "@/components/Icons";
import { ABOUT, CATEGORIES, categoryLabel, firstParagraph, gallery, heroImages, posts, products, services, SITE, training } from "@/lib/content";

const slides: HeroSlide[] = [
  { title: "Let's Make Zero Accidents", desc: "Toxic and flammable gas safety since 2012.", image: heroImages[0] },
  { title: "Gas Detection Equipment", desc: "Portable, fixed and sampling detectors for hazardous areas.", image: heroImages[1] },
  { title: "Safety Training Facility", desc: "Confined Space, Authorized Gas Tester and H2S Safety Awareness.", image: heroImages[2] },
  { title: "Industrial Services", desc: "Fabrication, Chemical Cleaning and Rental Welding Chamber.", image: heroImages[3] },
];

export default function HomePage() {
  const showcase = products.map((p) => ({
    slug: p.slug,
    model: p.model,
    type: p.type,
    category: p.category,
    categoryLabel: categoryLabel(p.category),
    image: p.images[0],
    blurb: p.description[0],
  }));

  const what: WhatItem[] = [
    ...services.map((s) => ({ title: s.name, text: firstParagraph(s), image: s.images[0], href: `/services/${s.slug}` })),
    ...training.map((t) => ({ title: `${t.name} Training`, text: firstParagraph(t), image: t.images[0], href: `/training/${t.slug}` })),
  ];

  const insights: InsightItem[] = [
    ...posts.map((b) => ({ title: b.title, text: b.excerpt, meta: b.dateLabel, image: b.image, href: `/blog/${b.slug}` })),
    ...gallery.map((g) => ({
      title: g.title,
      text: g.kind === "video" ? "Watch this training video from WMP." : "Documentation from WMP safety training.",
      meta: g.kind === "video" ? "Video" : "Gallery",
      image: g.image,
      href: "/gallery",
    })),
  ];

  return (
    <div className="home">
      <HeroSlider slides={slides} />
      <ProductShowcase products={showcase} tabs={CATEGORIES} />
      <WhatWeDo items={what} />

      <section className="sec-who">
        <div className="inner">
          <div className="sec-tit">
            <h2 data-reveal>WHO WE ARE</h2>
            <p data-reveal>{SITE.name} (WMP)<br />{ABOUT.aim}</p>
            <Link href="/about" className="view-btn dark" data-reveal>Detail View <ArrowRight /></Link>
          </div>
          <ul className="list" data-reveal>
            {ABOUT.pillars.map((p) => (
              <li key={p.title}>
                <Link href="/about">
                  <strong>{p.title}</strong>
                  <span>{p.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Insights items={insights} />

      <section className="sec-contact" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.76), rgba(0,0,0,.76)), url(${heroImages[4]})` }}>
        <div className="inner">
          <div className="sec-tit center">
            <span data-reveal>INQUIRY</span>
            <h2 data-reveal>Let&rsquo;s Make Zero Accidents</h2>
            <p data-reveal>{SITE.connect}</p>
          </div>
          <div className="form-wrap" data-reveal><ContactForm /></div>
        </div>
      </section>
    </div>
  );
}
