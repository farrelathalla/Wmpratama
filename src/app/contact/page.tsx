import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Chat, Clock, Mail, Phone, Pin } from "@/components/Icons";
import SubVisual from "@/components/sub/SubVisual";
import { SITE } from "@/lib/content";

export const metadata: Metadata = { title: "Contact Us", description: `Contact ${SITE.name}. ${SITE.address}.` };

export default function ContactPage() {
  const rows = [
    { icon: <Pin />, label: "Lokasi Kantor", value: SITE.address },
    { icon: <Phone />, label: "Telepon", value: SITE.phone, href: SITE.phoneHref },
    { icon: <Chat />, label: "WhatsApp", value: SITE.whatsapp, href: SITE.whatsappHref },
    { icon: <Mail />, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: <Clock />, label: "Jam Kerja", value: SITE.hours },
  ];
  return (
    <>
      <SubVisual section="Contact" sectionHref="/contact" current="Contact Us" />
      <div className="sub-wrap inner">
        <div className="sub-title">
          <h1 data-reveal>Let&rsquo;s Make Zero Accidents</h1>
          <p data-reveal>{SITE.connect}</p>
        </div>
        <div className="contact-grid">
          <ul className="contact-info" data-reveal>
            {rows.map((r) => (
              <li key={r.label}>
                {r.icon}
                <span>{r.label}</span>
                {r.href ? <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{r.value}</a> : <b>{r.value}</b>}
              </li>
            ))}
          </ul>
          <div className="contact-form" data-reveal><ContactForm /></div>
        </div>
        <div className="map" data-reveal>
          <iframe src={SITE.map} title="Winarto Mitra Pratama office location" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </div>
      </div>
    </>
  );
}
