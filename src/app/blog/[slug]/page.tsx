import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@/components/Icons";
import Blocks from "@/components/sub/Blocks";
import SubVisual from "@/components/sub/SubVisual";
import { posts, type Block } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => posts.map((b) => ({ slug: b.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = posts.find((x) => x.slug === slug);
  return b ? { title: b.title, description: b.excerpt, openGraph: { images: [b.image] } } : {};
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((x) => x.slug === slug);
  if (!post) notFound();
  return (
    <>
      <SubVisual section="Blog" sectionHref="/blog" current={post.title} />
      <article className="sub-wrap inner post">
        <header className="sub-title">
          <time dateTime={post.date} data-reveal>{post.dateLabel}</time>
          <h1 data-reveal>{post.title}</h1>
        </header>
        <div className="post-body" data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="post-cover" src={post.image} alt="Toxic gas warning sign" />
          <Blocks blocks={post.blocks as Block[]} />
          <div className="post-inline">
            {post.inlineImages.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="Gas hazard illustration" loading="lazy" />
            ))}
          </div>
          <Link href="/blog" className="view-btn"><ArrowLeft /> Back to Blog</Link>
        </div>
      </article>
    </>
  );
}
