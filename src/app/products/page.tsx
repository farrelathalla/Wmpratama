import type { Metadata } from "next";
import ProductCatalog from "@/components/sub/ProductCatalog";
import SubVisual from "@/components/sub/SubVisual";
import { CATEGORIES, categoryLabel, products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Products",
  description: "Portable, fixed and sampling gas detectors available from Winarto Mitra Pratama.",
};

export default function ProductsPage() {
  const items = products.map((p) => ({
    slug: p.slug,
    model: p.model,
    type: p.type,
    category: p.category,
    categoryLabel: categoryLabel(p.category),
    image: p.images[0],
    blurb: p.description[0],
  }));
  return (
    <>
      <SubVisual section="Products" sectionHref="/products" current="All Products" siblings={CATEGORIES.map((c) => ({ label: c.label, href: `/products?category=${c.id}` }))} />
      <div className="sub-wrap">
        <div className="sub-title inner">
          <h1 data-reveal>Product</h1>
          <p data-reveal>We are Offering Competitive Prices for Our Clients</p>
        </div>
        <ProductCatalog items={items} cats={CATEGORIES} />
      </div>
    </>
  );
}
