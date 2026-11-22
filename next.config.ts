import type { NextConfig } from "next";
import catalog from "./src/data/catalog.json";

const legacy = [
  { source: "/home", destination: "/" },
  { source: "/company", destination: "/products" },
  { source: "/contact-wm-pratama", destination: "/contact" },
  ...catalog.products.map((p) => ({ source: `/${p.oldSlug}`, destination: `/products/${p.slug}` })),
  ...catalog.services.map((s) => ({ source: `/${s.oldSlug}`, destination: `/services/${s.slug}` })),
  ...catalog.training.map((t) => ({ source: `/${t.oldSlug}`, destination: `/training/${t.slug}` })),
  ...catalog.blog.map((b) => ({ source: `/${b.oldSlug}`, destination: `/blog/${b.slug}` })),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { unoptimized: true },
  experimental: {
    // Hostinger reports many cores but little memory, so prerender workers stay capped.
    cpus: Number(process.env.BUILD_CPUS) || 2,
  },
  async redirects() {
    return legacy.map((r) => ({ ...r, permanent: true }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000" }],
      },
    ];
  },
};

export default nextConfig;
