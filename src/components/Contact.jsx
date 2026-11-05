import { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { DEMO_CONTACT } from '../data/menu';
import Reveal, { SectionHeading } from './Reveal';

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const submit = (ev) => {
    ev.preventDefault();
    const e = {};
    if (form.name.trim().length < 2) e.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Enter a valid email address.';
    if (!form.subject) e.subject = 'Please choose a subject.';
    if (form.message.trim().length < 10) e.message = 'Tell us a little more (10+ characters).';
    setErrors(e);
    if (Object.keys(e).length === 0) setSent(true);
  };

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-3xl bg-white px-8 py-14 text-center shadow-card">
        <CheckCircle2 className="h-16 w-16 text-forest" />
        <h3 className="mt-5 font-serif text-3xl text-forest">Message sent</h3>
        <p className="mt-3 max-w-sm leading-relaxed text-charcoal/65">
          Thanks, {form.name.split(' ')[0]} — we usually reply within one business day.
        </p>
        <p className="mt-2 text-sm text-charcoal/50">(Demo form — no message was actually sent.)</p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setForm({ name: '', email: '', subject: '', message: '' });
            setErrors({});
          }}
          className="btn-primary mt-7"
        >
          Send another message
        </button>
      </div>
    );
  }

  const selectClass = `field appearance-none ${errors.subject ? 'field-error' : ''} ${form.subject ? '' : 'text-charcoal/40'}`;

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl bg-white p-6 shadow-card sm:p-9">
      <h3 className="font-serif text-3xl text-forest">Send us a message</h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest">
            Name *
          </label>
          <input
            id="c-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className={`field ${errors.name ? 'field-error' : ''}`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="c-email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest">
            Email *
          </label>
          <input
            id="c-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@email.com"
            className={`field ${errors.email ? 'field-error' : ''}`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-subject" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest">
            Subject *
          </label>
          <select
            id="c-subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className={selectClass}
          >
            <option value="">Select a subject</option>
            <option>General enquiry</option>
            <option>Private dining &amp; events</option>
            <option>Allergies &amp; dietary needs</option>
            <option>Feedback</option>
          </select>
          {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-message" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest">
            Message *
          </label>
          <textarea
            id="c-message"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="How can we help?"
            className={`field resize-none ${errors.message ? 'field-error' : ''}`}
          />
          {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
        </div>
      </div>
      <button type="submit" className="btn-primary mt-7">
        <Send className="h-4 w-4" />
        Send Message
      </button>
    </form>
  );
}

export default function Contact() {
  const info = [
    { icon: MapPin, label: 'Visit us', value: DEMO_CONTACT.address, href: DEMO_CONTACT.mapEmbed },
    { icon: Phone, label: 'Call us', value: DEMO_CONTACT.phone, href: `tel:${DEMO_CONTACT.phone.replace(/[^+\d]/g, '')}` },
    { icon: Mail, label: 'Write to us', value: DEMO_CONTACT.email, href: `mailto:${DEMO_CONTACT.email}` },
  ];

  return (
    <section id="contact" className="scroll-mt-20 bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Find Us"
          title="Visit the Flame"
          subtitle="We would love to welcome you. Reach out for reservations, private events or simply to say hello."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Info column */}
          <Reveal className="space-y-5 lg:col-span-2">
            {info.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={label === 'Visit us' ? '_blank' : undefined}
                rel={label === 'Visit us' ? 'noreferrer' : undefined}
                className="group flex items-start gap-4 rounded-3xl bg-white p-6 shadow-card transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest text-cream transition-colors group-hover:bg-burnt">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-burnt">{label}</span>
                  <span className="mt-1 block leading-relaxed text-charcoal/75">{value}</span>
                </span>
              </a>
            ))}

            <div className="rounded-3xl bg-forest p-6 text-cream shadow-card">
              <h3 className="flex items-center gap-2 font-serif text-2xl">
                <Clock className="h-5 w-5 text-burnt" />
                Opening hours
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                {DEMO_CONTACT.hours.map((h) => (
                  <div key={h.days} className="flex items-baseline justify-between gap-4 border-b border-cream/10 pb-3 last:border-0 last:pb-0">
                    <dt className="text-cream/70">{h.days}</dt>
                    <dd className="text-right font-semibold">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* Form column */}
          <Reveal delay={0.12} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>

        {/* Map */}
        <Reveal delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-[2rem] shadow-card">
            <iframe
              title="Map — The Fork & Flame demo location, Portland OR"
              src={DEMO_CONTACT.mapEmbed}
              className="h-[380px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="bg-white px-6 py-4 text-sm text-charcoal/55">
              <MapPin className="mr-1.5 inline h-4 w-4 text-burnt" />
              Demo location shown for illustration — {DEMO_CONTACT.address}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
