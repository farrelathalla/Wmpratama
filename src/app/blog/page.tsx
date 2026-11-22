import type { Metadata } from "next";
import Link from "next/link";
import SubVisual from "@/components/sub/SubVisual";
import { posts } from "@/lib/content";

export const metadata: Metadata = { title: "Blog", description: "Articles about gas safety from WMP." };

export default function BlogPage() {
  return (
    <>
      <SubVisual section="Blog" sectionHref="/blog" current="Blog" />
      <div className="sub-wrap inner">
        <div className="sub-title">
          <h1 data-reveal>Blog</h1>
          <p data-reveal>Read The Latest Articles from Our Blog Post</p>
        </div>
        <p className="total-line">Total <b>{posts.length}</b></p>
        <ul className="blog-grid">
          {posts.map((b) => (
            <li key={b.slug} data-reveal>
              <Link href={`/blog/${b.slug}`}>
                <span className="img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.image} alt="" loading="lazy" />
                </span>
                <span className="body">
                  <time dateTime={b.date}>{b.dateLabel}</time>
                  <strong>{b.title}</strong>
                  <span className="desc">{b.excerpt}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
