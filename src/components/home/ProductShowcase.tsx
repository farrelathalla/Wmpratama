"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "../Icons";

export type ShowcaseProduct = { slug: string; model: string; type: string; category: string; categoryLabel: string; image: string; blurb: string };
type Tab = { id: string; label: string };

export default function ProductShowcase({ products, tabs }: { products: ShowcaseProduct[]; tabs: readonly Tab[] }) {
  const allTabs = useMemo(() => [{ id: "all", label: "All Products" }, ...tabs], [tabs]);
  const [tab, setTab] = useState("portable");
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [index, setIndex] = useState(0);
  const list = useMemo(() => (tab === "all" ? products : products.filter((p) => p.category === tab)), [tab, products]);
  const canLoop = list.length >= 6;
  const start = canLoop ? 2 : Math.floor((list.length - 1) / 2);

  return (
    <section className="sec-product">
      <div className="inner">
        <div className="sec-tit center">
          <h2 data-reveal>PRODUCT</h2>
          <p data-reveal>Explore WMP&rsquo;s Range of Gas Detection Equipment</p>
        </div>
      </div>
      <div className="tabs product-tabs" role="tablist" aria-label="Product categories" data-reveal>
        {allTabs.map((t) => (
          <button key={t.id} type="button" role="tab" aria-selected={t.id === tab} className={t.id === tab ? "is-on" : undefined} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="product-cont" data-reveal>
        <Swiper
          key={tab}
          modules={[Autoplay]}
          slidesPerView="auto"
          centeredSlides
          loop={canLoop}
          watchSlidesProgress
          initialSlide={start}
          speed={600}
          autoplay={canLoop ? { delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
          onSwiper={(s) => {
            setSwiper(s);
            setIndex(s.realIndex);
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) s.autoplay?.stop();
          }}
          onSlideChange={(s) => setIndex(s.realIndex)}
        >
          {list.map((p) => (
            <SwiperSlide key={p.slug}>
              <Link href={`/products/${p.slug}`}>
                <div className="img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={`${p.model} ${p.type}`} loading="lazy" />
                </div>
                <div className="txt">
                  <span className="badge">{p.categoryLabel}</span>
                  <strong>{p.model}</strong>
                  <p>{p.blurb}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="arrow">
          <button type="button" onClick={() => swiper?.slidePrev()} aria-label="Previous product"><ChevronLeft /></button>
          <div className="dots">
            {list.map((p, i) => (
              <button key={p.slug} type="button" className={i === index ? "is-on" : undefined} onClick={() => (canLoop ? swiper?.slideToLoop(i) : swiper?.slideTo(i))} aria-label={`Show ${p.model}`} />
            ))}
          </div>
          <button type="button" onClick={() => swiper?.slideNext()} aria-label="Next product"><ChevronRight /></button>
        </div>
      </div>
    </section>
  );
}
