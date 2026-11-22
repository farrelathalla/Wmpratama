"use client";

import Link from "next/link";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, ArrowRight } from "../Icons";

export type WhatItem = { title: string; text: string; image: string; href: string };
const pad = (n: number) => String(n).padStart(2, "0");

export default function WhatWeDo({ items }: { items: WhatItem[] }) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [active, setActive] = useState(0);

  return (
    <section className="sec-what">
      <div className="inner what-inner">
        <div className="sec-tit">
          <h2 data-reveal>WHAT WE DO</h2>
          <p data-reveal>We are committed to improving people competence and keeping industrial work safe through reliable gas maintenance solutions.</p>
        </div>
        <div className="what-wrap" data-reveal>
          <Swiper className="what-swiper" slidesPerView="auto" loop speed={1000} onSwiper={setSwiper} onSlideChange={(s) => setActive(s.realIndex)}>
            {items.map((item) => (
              <SwiperSlide key={item.href}>
                <div className="img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className="txt">
                  <Link href={item.href} className="tit">{item.title}</Link>
                  <p>{item.text}</p>
                  <div className="arrow-box">
                    <button type="button" onClick={() => swiper?.slidePrev()} aria-label="Previous"><ArrowLeft /></button>
                    <span className="count"><b>{pad(active + 1)}</b> / {pad(items.length)}</span>
                    <button type="button" onClick={() => swiper?.slideNext()} aria-label="Next"><ArrowRight /></button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
