import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { GALLERY } from '../data/menu';
import { SectionHeading } from './Reveal';

const SPANS = [
  'sm:col-span-2 sm:row-span-2',
  '',
  '',
  'sm:row-span-2',
  '',
  '',
  'sm:col-span-2',
  '',
  '',
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  const close = useCallback(() => setLightbox(null), []);
  const navigate = useCallback(
    (dir) => setLightbox((i) => (i + dir + GALLERY.length) % GALLERY.length),
    [],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, close, navigate]);

  return (
    <section id="gallery" className="scroll-mt-20 bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Moments & Memories"
          title="Our Gallery"
          subtitle="A glimpse inside the room — the fire, the food, and the faces that make it sing."
        />

        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-4 sm:gap-4">
          {GALLERY.map((photo, i) => (
            <motion.button
              key={photo.id}
              type="button"
              onClick={() => setLightbox(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className={`group relative overflow-hidden rounded-3xl shadow-card focus:outline-none focus:ring-2 focus:ring-burnt ${SPANS[i]}`}
              aria-label={`View photo: ${photo.alt}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-forestDark/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-400 group-hover:opacity-100">
                <Maximize2 className="h-6 w-6 text-cream" />
                <span className="px-4 text-center text-sm font-semibold text-cream">{photo.tag}</span>
              </div>
            </motion.button>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-charcoal/50">
          Tap any photo to view it larger — use arrow keys to browse.
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-forestDark/92 p-4 backdrop-blur-md"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close viewer"
              className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-cream/15 text-cream transition-colors hover:bg-burnt"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/15 text-cream transition-colors hover:bg-burnt sm:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/15 text-cream transition-colors hover:bg-burnt sm:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.figure
              key={lightbox}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="max-h-[86vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY[lightbox].src}
                alt={GALLERY[lightbox].alt}
                className="max-h-[76vh] w-full rounded-3xl object-contain shadow-2xl"
              />
              <figcaption className="mt-4 flex items-center justify-between text-cream">
                <span className="text-sm text-cream/80">{GALLERY[lightbox].alt}</span>
                <span className="ml-4 shrink-0 rounded-full bg-burnt px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                  {GALLERY[lightbox].tag}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
