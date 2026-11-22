import catalog from "@/data/catalog.json";

export type Block = { type: string; text?: string; items?: string[] };
export type Product = (typeof catalog.products)[number];
export type Page = Omit<(typeof catalog.services)[number], "blocks"> & { blocks: Block[] };
export type GalleryItem = { title: string; kind: string; image: string; youtube?: string };
export type NavLink = { label: string; href: string };
export type NavItem = NavLink & { children?: NavLink[] };
export type SearchEntry = { title: string; meta: string; href: string };

export const products = catalog.products;
export const services = catalog.services as Page[];
export const training = catalog.training as Page[];
export const gallery = catalog.gallery as GalleryItem[];
export const posts = catalog.blog;
export const heroImages = catalog.hero;

export const CATEGORIES = [
  { id: "portable", label: "Portable Detector" },
  { id: "fixed", label: "Fixed Detector" },
  { id: "sampling", label: "Sampling Detector" },
  { id: "health", label: "Breath Analyzer" },
] as const;

export const categoryLabel = (id: string) =>
  CATEGORIES.find((c) => c.id === id)?.label ?? "Product";

export const SITE = {
  name: "Winarto Mitra Pratama",
  short: "WMP",
  url: "https://wmpratama.omnity.co.id",
  description:
    "Winarto Mitra Pratama (WMP) provides toxic and flammable gas safety training, gas detection equipment sales and services, and utility works.",
  address: "Jl. Cempaka Baru VII No.38 Jakarta 10640",
  phone: "+62 21 42 888 222",
  phoneHref: "tel:+622142888222",
  whatsapp: "+62 811 1621 914",
  whatsappHref: "https://wa.me/628111621914?text=Halo%20WMPratama%20mohon%20informasinya",
  email: "info@wmpratama.co.id",
  hours: "Senin - Jumat (08.00 - 17.00 WIB)",
  connect: "Kami senang untuk terhubung dengan Anda untuk diskusi lebih lanjut",
  map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15866.889621186814!2d106.8618!3d-6.167915!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5a82c78388d%3A0x65962a2ea7ec03bf!2sWinarto%20Mitra%20Pratama%20(WMP)!5e0!3m2!1sen!2sid!4v1684737694414!5m2!1sen!2sid",
};

export const ABOUT = {
  history:
    "Winarto Mitra Pratama (WMP) begun its toxic and flammable gas safety training and services in 2012. During the service, our clients requires wider services aiming at more effective and efficient operations. Accordingly, we expands our service into gas equipment sales and services along with utility works in 2015.",
  driver:
    "Our service driver were the notion of flexible service for utmost satisfaction, meaning that our flexibility on performing our work will reflect in its results leading to clients utmost satisfaction. We also pride ourselves with service flexibility to adjust with clients requirements aiming at clients investments security.",
  aim: "Along with our clients and vendors, we aim to become one of the respected global energy services contractor.",
  pillars: [
    {
      title: "Our Goals",
      text: "To improve people competence through latest relevant industrial technologies utilization aiming for national human resource sustainability and utmost client satisfaction.",
    },
    {
      title: "Our Mission",
      text: "To Provide Excellent Services on Gas Maintenance Solutions and Human Resource Competence Building.",
    },
    {
      title: "Our Commitment",
      text: "WMP family is committed to ensure excellence services for all projects and clients through flexibility in addressing client requirements.",
    },
  ],
};

export const NAV: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    children: CATEGORIES.map((c) => ({ label: c.label, href: `/products?category=${c.id}` })),
  },
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
  },
  {
    label: "Training",
    href: "/training",
    children: training.map((t) => ({ label: t.name, href: `/training/${t.slug}` })),
  },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const SEARCH_INDEX: SearchEntry[] = [
  ...products.map((p) => ({
    title: p.model,
    meta: `${p.type} · ${categoryLabel(p.category)}`,
    href: `/products/${p.slug}`,
  })),
  ...services.map((s) => ({ title: s.name, meta: "Service", href: `/services/${s.slug}` })),
  ...training.map((t) => ({ title: t.name, meta: "Training", href: `/training/${t.slug}` })),
  ...posts.map((b) => ({ title: b.title, meta: "Blog", href: `/blog/${b.slug}` })),
];

export const firstParagraph = (page: Page) =>
  page.blocks.find((b) => b.type === "p" && (b.text?.length ?? 0) > 60)?.text ?? "";
