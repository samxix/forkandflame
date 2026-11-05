import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Plus, UtensilsCrossed } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menu';
import { useCart } from '../context/CartContext';
import { SectionHeading } from './Reveal';

const money = (n) => `$${n.toFixed(2)}`;

function FoodCard({ item, index }) {
  const { addItem, setCartOpen } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: 'easeOut' }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-shadow duration-300 hover:shadow-lift"
    >
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forestDark/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {item.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-burnt px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cream shadow-lg">
            {item.badge}
          </span>
        )}
        <span className="absolute bottom-4 right-4 rounded-full bg-cream/95 px-3.5 py-1.5 font-serif text-lg font-bold text-forest shadow">
          {money(item.price)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-burnt">{item.category}</p>
        <h3 className="mt-2 font-serif text-2xl leading-snug text-forest">{item.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/60">{item.description}</p>

        <div className="mt-5 flex items-center gap-2">
          <button type="button" onClick={handleAdd} className="btn-primary flex-1 !px-4 !py-3">
            {added ? (
              <>
                <Check className="h-4 w-4" /> Added
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" /> Add to Cart
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`View cart after adding ${item.name}`}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-beige text-forest transition-colors hover:border-forest hover:bg-forest hover:text-cream"
          >
            <UtensilsCrossed className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function MenuSection() {
  const [active, setActive] = useState('All');

  const visible = useMemo(
    () => (active === 'All' ? MENU_ITEMS : MENU_ITEMS.filter((i) => i.category === active)),
    [active],
  );

  return (
    <section id="menu" className="scroll-mt-20 bg-beige/50">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Taste the Season"
          title="Our Menu"
          subtitle="A menu written each morning around the market's finest arrivals — then cooked over open flame, the way it should be."
        />

        {/* Filters */}
        <div className="mt-12 flex flex-wrap justify-center gap-2.5 sm:gap-3" role="tablist" aria-label="Menu categories">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = cat === active;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(cat)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 sm:px-7 ${
                  isActive
                    ? 'text-cream shadow-lg shadow-forest/25'
                    : 'bg-white text-forest shadow-card hover:-translate-y-0.5 hover:text-burnt'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="menu-pill"
                    className="absolute inset-0 rounded-full bg-forest"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-center text-sm text-charcoal/55" aria-live="polite">
          Showing {visible.length} of {MENU_ITEMS.length} dishes
        </p>

        {/* Cards */}
        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <FoodCard key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
