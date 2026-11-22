import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailPage from "@/components/sub/DetailPage";
import { firstParagraph, services } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? { title: s.name, description: firstParagraph(s) } : {};
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const page = services.find((x) => x.slug === slug);
  if (!page) notFound();
  return (
    <DetailPage
      page={page}
      section="Services"
      sectionHref="/services"
      badge="Service"
      siblings={services.map((s) => ({ label: s.name, href: `/services/${s.slug}` }))}
      related={services.filter((s) => s.slug !== slug).map((s) => ({ ...s, href: `/services/${s.slug}` }))}
    />
  );
}
