import type { Metadata } from "next";
import GalleryGrid from "@/components/sub/GalleryGrid";
import SubVisual from "@/components/sub/SubVisual";
import { gallery } from "@/lib/content";

export const metadata: Metadata = { title: "Gallery", description: "Photos and videos from WMP safety training." };

export default function GalleryPage() {
  return (
    <>
      <SubVisual section="Gallery" sectionHref="/gallery" current="Gallery" />
      <div className="sub-wrap">
        <div className="sub-title inner">
          <h1 data-reveal>Gallery</h1>
          <p data-reveal>Professional Stuffs Ready to Help Your Business</p>
        </div>
        <GalleryGrid items={gallery} />
      </div>
    </>
  );
}
