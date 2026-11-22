import type { Metadata } from "next";
import IndexPage from "@/components/sub/IndexPage";
import { services } from "@/lib/content";

export const metadata: Metadata = { title: "Services", description: "Fabrication, chemical cleaning and rental welding chamber services from WMP." };

export default function ServicesPage() {
  return (
    <IndexPage
      section="Services"
      href="/services"
      title="Our Services"
      intro="We are here for Our Clients"
      pages={services}
      siblings={services.map((s) => ({ label: s.name, href: `/services/${s.slug}` }))}
    />
  );
}
