"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll reveal matching AOS `fade-up` with `once: false`: an element plays when it
 * enters from below and resets once it leaves through the bottom of the viewport.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
          else if (entry.boundingClientRect.top > 0) entry.target.classList.remove("is-in");
        }
      },
      { rootMargin: "0px 0px -20px 0px" },
    );

    const watch = (root: ParentNode) => root.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    watch(document);

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.hasAttribute("data-reveal")) io.observe(node);
          watch(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Elements at the very end of the page may never cross the trigger line.
    const onScroll = () => {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
