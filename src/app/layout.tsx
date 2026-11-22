import type { Metadata, Viewport } from "next";
import "@fontsource-variable/outfit";
import "swiper/css";
import "@/styles/base.css";
import "@/styles/chrome.css";
import "@/styles/home.css";
import "@/styles/sub.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import TopButton from "@/components/TopButton";
import { NAV, SEARCH_INDEX, SITE } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | Gas Safety, Detection & Training`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  // Preview domain: the live company domain stays the indexed one until launch.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    images: ["/images/hero/hero-1.webp"],
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#000000" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/Pretendard-Latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip" href="#content">Skip to content</a>
        <Header nav={NAV} search={SEARCH_INDEX} site={{ phone: SITE.phone, phoneHref: SITE.phoneHref, whatsapp: SITE.whatsapp, whatsappHref: SITE.whatsappHref, email: SITE.email }} />
        <main id="content">{children}</main>
        <Footer />
        <TopButton />
        <RevealObserver />
      </body>
    </html>
  );
}
