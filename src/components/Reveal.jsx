import { motion } from 'framer-motion';
import React from 'react';

/** Fade-and-rise reveal on scroll, used by every section. */
export default function Reveal({ children, delay = 0, className, y = 28 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', light = false }) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <Reveal className={`flex flex-col gap-4 ${alignClass} ${align === 'center' ? 'mx-auto max-w-2xl' : ''}`}>
      <span className="eyebrow">
        <span aria-hidden className="h-px w-10 bg-burnt" />
        {eyebrow}
      </span>
      <h2
        className={`font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl ${
          light ? 'text-cream' : 'text-forest'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-xl text-base leading-relaxed sm:text-lg ${light ? 'text-cream/75' : 'text-charcoal/65'}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
