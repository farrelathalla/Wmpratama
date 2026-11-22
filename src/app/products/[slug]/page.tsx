import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/Icons";
import ImageViewer from "@/components/sub/ImageViewer";
import SubVisual from "@/components/sub/SubVisual";
import { categoryLabel, products } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  return p ? { title: `${p.model} ${p.type}`, description: p.description[0], openGraph: { images: [p.images[0]] } } : {};
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();
  const siblings = products.filter((x) => x.category === p.category).map((x) => ({ label: x.model, href: `/products/${x.slug}` }));
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <SubVisual section="Products" sectionHref="/products" current={p.model} siblings={siblings} />
      <div className="sub-wrap inner">
        <div className="sub-title"><p className="h" data-reveal>Product</p></div>
        <article className="thumb-wrap" data-reveal>
          <ImageViewer images={p.images} alt={p.model} />
          <div className="thumb-info">
            <span className="badge">{categoryLabel(p.category)}</span>
            <h1>{p.model}{p.modelNote ? ` (${p.modelNote})` : ""}</h1>
            <strong className="type">{p.type}</strong>
            <div className="blocks">
              {p.description.map((d) => <p key={d}>{d}</p>)}
              {p.features.length > 0 && (
                <>
                  <h2>KEY FEATURES</h2>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f.title + f.text}>{f.title && <b>{f.title}: </b>}{f.text}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <Link href="/contact" className="view-btn">Ask About This Product <ArrowRight /></Link>
          </div>
        </article>
        {related.length > 0 && (
          <section className="related">
            <h2 data-reveal>Related Products</h2>
            <ul className="card-grid product-cards">
              {related.map((r) => (
                <li key={r.slug} data-reveal>
                  <Link href={`/products/${r.slug}`}>
                    <span className="img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.images[0]} alt={r.model} loading="lazy" />
                    </span>
                    <strong>{r.model}</strong>
                    <span className="desc">{r.type}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
