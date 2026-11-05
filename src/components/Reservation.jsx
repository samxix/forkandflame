import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Clock,
  Users,
} from 'lucide-react';
import Reveal, { SectionHeading } from './Reveal';

const TIME_SLOTS = [
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM',
  '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
];

const todayISO = () => {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

function validate(form) {
  const e = {};
  if (form.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Enter a valid email address.';
  if (!/^[\d\s()+.-]{7,}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number.';
  if (!form.date) e.date = 'Please choose a date.';
  else if (form.date < todayISO()) e.date = 'Date cannot be in the past.';
  if (!form.time) e.time = 'Please choose a time.';
  if (!form.guests || Number(form.guests) < 1) e.guests = 'Select at least 1 guest.';
  return e;
}

export default function Reservation() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    requests: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  };

  return (
    <section id="reserve" className="relative scroll-mt-20 overflow-hidden bg-forest">
      {/* Ambient background image */}
      <img
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest via-forest/85 to-forestDark" />

      <div className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Reserve Your Evening"
          title="Book a Table"
          light
          subtitle="Candlelight, a crackling hearth and a table with your name on it. Tell us when — we will take care of the rest."
        />

        <Reveal delay={0.15}>
          <div className="mt-12 overflow-hidden rounded-[2rem] bg-cream shadow-2xl">
            {submitted ? (
              /* Success screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="px-6 py-16 text-center sm:px-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest/10"
                >
                  <CheckCircle2 className="h-10 w-10 text-forest" />
                </motion.div>
                <h3 className="mt-6 font-serif text-3xl text-forest sm:text-4xl">
                  Thank you, {form.name.split(' ')[0]}!
                </h3>
                <p className="mx-auto mt-3 max-w-md leading-relaxed text-charcoal/65">
                  Your table for <strong>{form.guests} guest{Number(form.guests) > 1 ? 's' : ''}</strong> on{' '}
                  <strong>{new Date(`${form.date}T00:00`).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</strong> at{' '}
                  <strong>{form.time}</strong> has been noted. We will confirm shortly at{' '}
                  <strong>{form.email}</strong>.
                </p>
                <p className="mx-auto mt-4 max-w-md rounded-xl bg-burnt/10 px-4 py-3 text-sm text-burntDark">
                  Demo only — real-time reservation confirmation requires a backend integration.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', phone: '', date: '', time: '', guests: '2', requests: '' });
                    setErrors({});
                  }}
                  className="btn-primary mt-8"
                >
                  Make another reservation
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} noValidate className="p-6 sm:p-10">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="res-name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest">
                      Full name *
                    </label>
                    <input
                      id="res-name"
                      value={form.name}
                      onChange={set('name')}
                      placeholder="Alex Morgan"
                      className={`field ${errors.name ? 'field-error' : ''}`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="res-email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest">
                      Email *
                    </label>
                    <input
                      id="res-email"
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      placeholder="alex@email.com"
                      className={`field ${errors.email ? 'field-error' : ''}`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="res-phone" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest">
                      Phone number *
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      value={form.phone}
                      onChange={set('phone')}
                      placeholder="+1 (555) 000-0000"
                      className={`field ${errors.phone ? 'field-error' : ''}`}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="res-date" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest">
                      Reservation date *
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      min={todayISO()}
                      value={form.date}
                      onChange={set('date')}
                      className={`field ${errors.date ? 'field-error' : ''}`}
                    />
                    {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
                  </div>
                  <div className="relative">
                    <label htmlFor="res-time" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest">
                      Reservation time *
                    </label>
                    <select
                      id="res-time"
                      value={form.time}
                      onChange={set('time')}
                      className={`field appearance-none ${errors.time ? 'field-error' : ''} ${form.time ? '' : 'text-charcoal/40'}`}
                    >
                      <option value="">Select a time</option>
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute bottom-3.5 right-4 h-4 w-4 text-charcoal/40" />
                    {errors.time && <p className="mt-1 text-xs text-red-500">{errors.time}</p>}
                  </div>
                  <div className="relative">
                    <label htmlFor="res-guests" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest">
                      Number of guests *
                    </label>
                    <select
                      id="res-guests"
                      value={form.guests}
                      onChange={set('guests')}
                      className={`field appearance-none ${errors.guests ? 'field-error' : ''}`}
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={String(n)}>
                          {n} guest{n > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute bottom-3.5 right-4 h-4 w-4 text-charcoal/40" />
                    {errors.guests && <p className="mt-1 text-xs text-red-500">{errors.guests}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="res-requests" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest">
                      Special requests
                    </label>
                    <textarea
                      id="res-requests"
                      rows={3}
                      value={form.requests}
                      onChange={set('requests')}
                      placeholder="Anniversary, allergies, window seat…"
                      className="field resize-none"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-accent mt-8 w-full sm:w-auto">
                  <CalendarCheck className="h-4 w-4" />
                  Confirm Reservation
                </button>
                <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-charcoal/50 sm:items-center">
                  <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 sm:mt-0" />
                  Group of 7 or more? Please note it in special requests. Demo form — a backend is
                  required for live confirmations.
                </p>
              </form>
            )}

            {/* Info strip */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-beige px-6 py-5 text-sm text-charcoal/60 sm:px-10">
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-burnt" /> Up to 12 guests online
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-burnt" /> Kitchen open from 5:00 PM daily
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarCheck className="h-4 w-4 text-burnt" /> Complimentary cancellation up to 3h before
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
