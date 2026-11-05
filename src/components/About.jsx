import { motion } from 'framer-motion';
import { Leaf, Award, Users, Flame } from 'lucide-react';
import Reveal from './Reveal';

const STATS = [
  { icon: Award, value: '25+', label: 'Years of Craft' },
  { icon: Leaf, value: '100%', label: 'Locally Sourced' },
  { icon: Users, value: '40k+', label: 'Happy Guests' },
  { icon: Flame, value: '1', label: 'Live-fire Grill' },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-32">
        {/* Editorial image collage */}
        <div className="relative">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] shadow-soft">
              <motion.img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1100&q=80"
                alt="Chef finishing a dish under the pass lights"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="absolute -bottom-10 -right-2 hidden w-56 sm:block lg:-right-8">
            <div className="overflow-hidden rounded-[1.5rem] border-4 border-cream shadow-lift">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
                alt="A beautifully plated signature dish"
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={0.25} className="absolute -left-4 top-6 sm:-left-6">
            <div className="rounded-2xl bg-forest px-6 py-5 text-cream shadow-lift">
              <p className="font-serif text-3xl leading-none">1998</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-cream/70">
                Est. · Portland
              </p>
            </div>
          </Reveal>
        </div>

        {/* Copy */}
        <div>
          <Reveal>
            <span className="eyebrow">
              <span aria-hidden className="h-px w-10 bg-burnt" />
              Our Story
            </span>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] text-forest sm:text-5xl lg:text-6xl">
              More Than Just a <span className="italic text-burnt">Meal</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/70">
              For over twenty-five years, The Fork &amp; Flame has been a love letter to the
              seasons. Every morning, our kitchen partners with farmers, fishermen and foragers
              across the Pacific Northwest — because the best stories begin with the freshest
              ingredients.
            </p>
            <p className="mt-4 leading-relaxed text-charcoal/65">
              Our philosophy is simple: honour the ingredient, respect the fire, and never let a
              guest feel like a stranger. Chef Elena Marchand leads a brigade of twelve chefs
              around a single open-flame hearth, where smoke, patience and intuition turn
              humble produce into food that lingers in the memory long after the last bite.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <blockquote className="mt-8 border-l-4 border-burnt pl-6">
              <p className="font-serif text-xl italic leading-relaxed text-forest sm:text-2xl">
                “Cooking is the most honest form of love — it asks for nothing in return but a
                seat at the table.”
              </p>
              <cite className="mt-3 block text-sm font-semibold uppercase tracking-wider not-italic text-charcoal/55">
                Elena Marchand · Executive Chef &amp; Founder
              </cite>
            </blockquote>
          </Reveal>

          <Reveal delay={0.26}>
            <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-beige bg-white px-4 py-5 text-center shadow-card transition-transform duration-300 hover:-translate-y-1"
                >
                  <Icon className="mx-auto h-5 w-5 text-burnt" />
                  <dt className="mt-2 font-serif text-2xl font-bold text-forest">{value}</dt>
                  <dd className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-charcoal/55">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
