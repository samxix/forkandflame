import { useState } from 'react';
import {
  CheckCircle2,
  Facebook,
  Flame,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Youtube,
} from 'lucide-react';
import { DEMO_CONTACT } from '../data/menu';

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Book a Table', href: '#reserve' },
  { label: 'Contact', href: '#contact' },
];

const SOCIALS = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Facebook, label: 'Facebook' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Youtube, label: 'YouTube' },
];

function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const submit = (ev) => {
    ev.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setDone(true);
  };

  if (done) {
    return (
      <p className="flex items-center gap-2 rounded-xl bg-forestLight/60 px-4 py-3.5 text-sm text-cream">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-burnt" />
        You’re on the list — first letter arrives with the new moon.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex overflow-hidden rounded-full bg-white/10 ring-1 ring-white/20 transition focus-within:ring-burnt">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full min-w-0 bg-transparent px-5 py-3.5 text-sm text-cream outline-none placeholder:text-cream/40"
        />
        <button
          type="submit"
          aria-label="Subscribe to newsletter"
          className="flex shrink-0 items-center gap-2 bg-burnt px-5 text-sm font-semibold text-cream transition-colors hover:bg-burntDark"
        >
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">Join</span>
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
    </form>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forestDark text-cream">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10">
                <Flame className="h-5 w-5 text-burnt" />
              </span>
              <span className="leading-tight">
                <span className="block font-serif text-xl font-bold">
                  The Fork <span className="text-burnt">&amp;</span> Flame
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.32em] text-cream/60">
                  Fine Dining · Est. 1998
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-sm leading-relaxed text-cream/65">
              A chef-led, fire-driven kitchen where every evening is a small celebration.
              Seasonal, local, and served with love.
            </p>
            <div className="mt-7 max-w-sm">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cream/60">
                The Ember Letter — monthly menu news
              </p>
              <Newsletter />
            </div>
          </div>

          {/* Quick links */}
          <nav className="lg:col-span-3" aria-label="Footer navigation">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-burnt">Explore</h3>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href + link.label}>
                  <a
                    href={link.href}
                    className="text-cream/70 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-burnt">Contact</h3>
            <ul className="mt-5 space-y-4 text-cream/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-burnt" />
                <span>{DEMO_CONTACT.address} <em className="text-cream/45">(demo)</em></span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 shrink-0 text-burnt" />
                <a href={`tel:${DEMO_CONTACT.phone.replace(/[^+\d]/g, '')}`} className="transition-colors hover:text-cream">
                  {DEMO_CONTACT.phone} <em className="text-cream/45">(demo)</em>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 shrink-0 text-burnt" />
                <a href={`mailto:${DEMO_CONTACT.email}`} className="transition-colors hover:text-cream">
                  {DEMO_CONTACT.email} <em className="text-cream/45">(demo)</em>
                </a>
              </li>
            </ul>

            <div className="mt-7 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#home"
                  onClick={(e) => e.preventDefault()}
                  aria-label={`${label} (demo link)`}
                  title={`${label} — demo link`}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-all duration-300 hover:-translate-y-1 hover:bg-burnt"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-sm text-cream/45 sm:flex-row">
          <p>© {year} The Fork &amp; Flame. All rights reserved. Demo website — not a real restaurant.</p>
          <p className="flex items-center gap-1.5">
            Crafted with <Flame className="h-4 w-4 text-burnt" /> and seasonal produce.
          </p>
        </div>
      </div>
    </footer>
  );
}
