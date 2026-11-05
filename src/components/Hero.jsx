import { motion } from 'framer-motion';
import { ArrowRight, Clock, Flame, CalendarCheck } from 'lucide-react';
import { HERO_IMAGE } from '../data/menu';

const parent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden bg-forestDark">
      {/* Background */}
      <motion.img
        src={HERO_IMAGE}
        alt="Candlelit fine-dining table at The Fork & Flame"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: 'easeOut' }}
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forestDark/70 via-forestDark/45 to-forestDark/85" />
      <div className="absolute inset-0 bg-forest/20" />

      {/* Content */}
      <motion.div
        variants={parent}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-28 pt-36 sm:px-6 lg:px-8"
      >
        <motion.p
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-cream backdrop-blur"
        >
          <Flame className="h-3.5 w-3.5 text-burnt" />
          Est. 1998 · Chef-led kitchen
        </motion.p>

        <motion.h1
          variants={item}
          className="max-w-3xl font-serif text-5xl leading-[1.02] text-cream sm:text-7xl lg:text-8xl"
        >
          Good Food.
          <br />
          <span className="italic text-burnt">Great Moments.</span>
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80 sm:text-xl">
          An unforgettable dining experience, crafted with passion and served with love.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a href="#menu" className="btn-accent">
            Explore Our Menu
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#reserve" className="btn-outline-light">
            <CalendarCheck className="h-4 w-4" />
            Book a Table
          </a>
        </motion.div>
      </motion.div>

      {/* Opening hours bar */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute inset-x-0 bottom-0 z-10 border-t border-cream/15 bg-forestDark/55 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-2 px-4 py-4 text-sm text-cream/85 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 font-semibold">
            <Clock className="h-4 w-4 text-burnt" />
            Open daily from 5:00 PM
          </span>
          <span className="hidden h-4 w-px bg-cream/25 sm:block" />
          <span>Mon–Thu till 10:00 PM</span>
          <span className="hidden h-4 w-px bg-cream/25 sm:block" />
          <span>Fri–Sat till 11:30 PM</span>
          <span className="ml-auto hidden items-center gap-2 text-cream/70 md:inline-flex">
            Seasonal tasting menu from $89 · Wine cellar open nightly
          </span>
        </div>
      </motion.div>
    </section>
  );
}
