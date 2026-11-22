import type { Metadata } from "next";
import IndexPage from "@/components/sub/IndexPage";
import { training } from "@/lib/content";

export const metadata: Metadata = { title: "Training Facility", description: "Confined Space, Authorized Gas Tester and H2S Safety Awareness training from WMP." };

export default function TrainingPage() {
  return (
    <IndexPage
      section="Training"
      href="/training"
      title="Training Facility"
      intro="Building people competence for high-risk work"
      pages={training}
      siblings={training.map((t) => ({ label: t.name, href: `/training/${t.slug}` }))}
    />
  );
}
