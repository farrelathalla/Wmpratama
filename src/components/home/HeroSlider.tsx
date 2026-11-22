"use client";

import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export type HeroSlide = { title: string; desc: string; image: string };

const INTERLEAVE = 0.75;
type SlideEl = HTMLElement & { progress: number };
const innerOf = (slide: Element) => slide.querySelector<HTMLElement>(".slide-inner");

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [active, setActive] = useState(0);

  return (
    <section className="visual" aria-roledescription="carousel" aria-label="Highlights">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        speed={1200}
        loop
        watchSlidesProgress
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        onSwiper={(s) => {
          setSwiper(s);
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) s.autoplay?.stop();
        }}
        onSlideChange={(s) => setActive(s.realIndex)}
        onProgress={(s) => {
          s.slides.forEach((slide) => {
            const inner = innerOf(slide);
            if (inner) inner.style.transform = `translate3d(${(slide as SlideEl).progress * s.width * INTERLEAVE}px, 0, 0)`;
          });
        }}
        onSetTransition={(s, speed) => {
          s.slides.forEach((slide) => {
            slide.style.transition = `${speed}ms`;
            const inner = innerOf(slide);
            if (inner) inner.style.transition = `${speed}ms`;
          });
        }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.title}>
            <div className="slide-inner">
              <div className="bg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slide.image} alt="" fetchPriority={i === 0 ? "high" : "auto"} loading={i === 0 ? "eager" : "lazy"} />
              </div>
              <div className="inner txtwrap">
                {i === 0 ? <h1 className="tit"><span>{slide.title}</span></h1> : <p className="tit"><span>{slide.title}</span></p>}
                <div className="desc"><span>{slide.desc}</span></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="inner progress-wrap">
        <ul className="progress">
          {slides.map((slide, i) => (
            <li key={slide.title} className={i === active ? "is-active" : undefined}>
              <button type="button" onClick={() => swiper?.slideToLoop(i)} aria-label={`Show slide ${i + 1}: ${slide.title}`} aria-current={i === active}>
                <strong>0{i + 1}</strong>
                <span className="bar" key={i === active ? `on-${active}` : "off"} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
