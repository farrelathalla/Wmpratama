"use client";

import { useState } from "react";

const PHONE = { label: "+62 21 42 888 222", href: "tel:+622142888222" };
const EMAIL = "info@wmpratama.co.id";

/** The form is presentational for now: nothing is sent or stored. */
export default function ContactForm() {
  const [notice, setNotice] = useState(false);

  return (
    <form
      className="fr-form"
      onSubmit={(e) => {
        e.preventDefault();
        setNotice(true);
      }}
    >
      <div className="row">
        <label className="item">
          <span>Full Name *</span>
          <input name="fullname" required autoComplete="name" placeholder="Please enter your name." />
        </label>
        <label className="item">
          <span>E-mail *</span>
          <input name="email" type="email" required autoComplete="email" placeholder="Please enter your email." />
        </label>
      </div>
      <label className="item">
        <span>Phone</span>
        <input name="phone" type="tel" autoComplete="tel" placeholder="Please enter your phone number." />
      </label>
      <label className="item">
        <span>Message *</span>
        <textarea name="description" required rows={4} placeholder="Please enter a message." />
      </label>
      <button type="submit" className="apply-btn">Send Message</button>
      <p className={`form-notice${notice ? " is-on" : ""}`} role="status">
        {notice && (
          <>
            Your message has not been sent because online submission is not active yet. Please contact us at{" "}
            <a href={PHONE.href}>{PHONE.label}</a> or <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </>
        )}
      </p>
    </form>
  );
}
