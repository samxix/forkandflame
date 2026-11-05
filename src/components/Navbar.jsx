import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Flame, Menu as MenuIcon, ShoppingBasket, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream/90 py-3 shadow-card backdrop-blur-md' : 'bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="group flex items-center gap-2.5">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ${
              scrolled ? 'bg-forest' : 'bg-cream/15 backdrop-blur'
            }`}
          >
            <Flame className="h-5 w-5 text-burnt" />
          </span>
          <span className="leading-tight">
            <span className={`block font-serif text-lg font-bold tracking-wide ${scrolled ? 'text-forest' : 'text-cream'}`}>
              The Fork <span className="text-burnt">&amp;</span> Flame
            </span>
            <span
              className={`block text-[10px] font-semibold uppercase tracking-[0.32em] ${
                scrolled ? 'text-charcoal/55' : 'text-cream/70'
              }`}
            >
              Fine Dining
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative text-sm font-medium uppercase tracking-wider transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-burnt after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled ? 'text-forest hover:text-burnt' : 'text-cream/90 hover:text-cream'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open cart, ${count} items`}
            className={`relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5 ${
              scrolled ? 'bg-forest text-cream hover:bg-forestLight' : 'bg-cream/15 text-cream backdrop-blur hover:bg-cream hover:text-forest'
            }`}
          >
            <ShoppingBasket className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-burnt px-1 text-[11px] font-bold text-cream">
                {count}
              </span>
            )}
          </button>
          <a
            href="#reserve"
            className="btn-accent hidden !px-6 !py-3 lg:inline-flex"
          >
            Book a Table
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden ${
              scrolled ? 'bg-forest text-cream' : 'bg-cream/15 text-cream backdrop-blur'
            }`}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-beige bg-cream lg:hidden"
          >
            <ul className="space-y-1 px-6 py-5">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-3 font-serif text-xl text-forest transition-colors hover:bg-beige/60"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-3">
                <a href="#reserve" onClick={() => setMobileOpen(false)} className="btn-accent w-full">
                  Book a Table
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
