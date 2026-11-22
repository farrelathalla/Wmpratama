"use client";

import Link from "next/link";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "../Icons";

export type InsightItem = { title: string; text: string; meta: string; image: string; href: string };

export default function Insights({ items }: { items: InsightItem[] }) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [active, setActive] = useState(0);

  return (
    <section className="sec-insight">
      <div className="inner">
        <div className="top">
          <div className="sec-tit">
            <h2 data-reveal>BLOG &amp; GALLERY</h2>
            <p data-reveal>Read our latest article and see our training in the field.</p>
          </div>
          <Link href="/gallery" className="view-btn" data-reveal>Detail View <ArrowRight /></Link>
        </div>
        <div className="cont" data-reveal>
          <Swiper slidesPerView="auto" loop onSwiper={setSwiper} onSlideChange={(s) => setActive(s.realIndex)}>
            {items.map((item) => (
              <SwiperSlide key={item.title}>
                <Link href={item.href}>
                  <div className="img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt="" loading="lazy" />
                  </div>
                  <div className="txt">
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                    <span>{item.meta}</span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="arrow">
            <button type="button" onClick={() => swiper?.slidePrev()} aria-label="Previous item"><ChevronLeft /></button>
            <div className="dots">
              {items.map((item, i) => (
                <button key={item.title} type="button" className={i === active ? "is-on" : undefined} onClick={() => swiper?.slideToLoop(i)} aria-label={`Show ${item.title}`} />
              ))}
            </div>
            <button type="button" onClick={() => swiper?.slideNext()} aria-label="Next item"><ChevronRight /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
