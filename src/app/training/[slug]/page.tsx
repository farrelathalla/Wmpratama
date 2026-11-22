import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailPage from "@/components/sub/DetailPage";
import { firstParagraph, training } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => training.map((t) => ({ slug: t.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = training.find((x) => x.slug === slug);
  return t ? { title: `${t.name} Training`, description: firstParagraph(t) } : {};
}

export default async function TrainingDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = training.find((x) => x.slug === slug);
  if (!page) notFound();
  return (
    <DetailPage
      page={page}
      section="Training"
      sectionHref="/training"
      badge="Training"
      siblings={training.map((t) => ({ label: t.name, href: `/training/${t.slug}` }))}
      related={training.filter((t) => t.slug !== slug).map((t) => ({ ...t, href: `/training/${t.slug}` }))}
    />
  );
}
