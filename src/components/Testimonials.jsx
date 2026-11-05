import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/menu';
import Reveal, { SectionHeading } from './Reveal';

function Stars({ rating }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-burnt text-burnt' : 'text-beige'}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-beige/50">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Guest Words"
          title="What Our Guests Say"
          subtitle="Five-star evenings, told by the people who lived them."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8 xl:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.1}>
              <figure className="group flex h-full flex-col rounded-3xl bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <Quote className="h-8 w-8 text-burnt/70" aria-hidden />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-charcoal/70">
                  “{t.review}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3.5 border-t border-beige pt-5">
                  <img
                    src={t.avatar}
                    alt={`Portrait of ${t.name}`}
                    loading="lazy"
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-beige"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-serif text-lg leading-tight text-forest">{t.name}</p>
                    <p className="truncate text-xs text-charcoal/50">{t.role}</p>
                    <div className="mt-1.5">
                      <Stars rating={t.rating} />
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
