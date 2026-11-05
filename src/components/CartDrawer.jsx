import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBasket,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DELIVERY_FEE, FREE_DELIVERY_FROM } from '../data/menu';

const money = (n) => `$${n.toFixed(2)}`;

function CheckoutForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = 'Please enter your name.';
    if (!/^[\d\s()+.-]{7,}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number.';
    if (form.address.trim().length < 8) e.address = 'Please enter your delivery address.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (validate()) onSuccess();
  };

  const field = (key, label, placeholder) => (
    <div>
      <label htmlFor={`co-${key}`} className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-forest">
        {label}
      </label>
      <input
        id={`co-${key}`}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        className={`field ${errors[key] ? 'field-error' : ''}`}
      />
      {errors[key] && <p className="mt-1 text-xs text-red-500">{errors[key]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <h3 className="font-serif text-2xl text-forest">Checkout details</h3>
      {field('name', 'Full name', 'Alex Morgan')}
      {field('phone', 'Phone', '+1 (555) 000-0000')}
      {field('address', 'Delivery address', 'Street, city, ZIP')}
      <button type="submit" className="btn-accent w-full">
        Place Order
      </button>
    </form>
  );
}

export default function CartDrawer() {
  const {
    items,
    setQty,
    removeItem,
    clearCart,
    subtotal,
    deliveryFee,
    total,
    isCartOpen,
    setCartOpen,
  } = useCart();
  const [step, setStep] = useState('cart'); // cart | checkout | done

  const close = () => {
    setCartOpen(false);
    window.setTimeout(() => setStep('cart'), 350);
  };

  const progress = useMemo(
    () => Math.min(100, (subtotal / FREE_DELIVERY_FROM) * 100),
    [subtotal],
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-forestDark/60 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-beige px-6 py-5">
              <h2 className="flex items-center gap-2.5 font-serif text-2xl text-forest">
                <ShoppingBasket className="h-5 w-5 text-burnt" />
                {step === 'checkout' ? 'Checkout' : 'Your Basket'}
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Close cart"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-beige/70 text-forest transition-colors hover:bg-beige"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {step === 'done' ? (
              /* Success state */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-1 flex-col items-center justify-center px-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                >
                  <CheckCircle2 className="h-20 w-20 text-forest" />
                </motion.div>
                <h3 className="mt-6 font-serif text-3xl text-forest">Order placed!</h3>
                <p className="mt-3 leading-relaxed text-charcoal/65">
                  Thank you — our kitchen is firing up your dishes now. Expected delivery in
                  35–45 minutes. A confirmation has been sent to you.
                </p>
                <p className="mt-2 text-sm text-charcoal/50">
                  (Demo checkout — no payment was taken.)
                </p>
                <button type="button" onClick={close} className="btn-primary mt-8">
                  Back to browsing
                </button>
              </motion.div>
            ) : items.length === 0 ? (
              /* Empty state */
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-beige/70">
                  <ShoppingBasket className="h-10 w-10 text-forest/50" />
                </div>
                <h3 className="mt-6 font-serif text-2xl text-forest">Your basket is empty</h3>
                <p className="mt-2 text-charcoal/60">
                  Something delicious is waiting for you on the menu.
                </p>
                <a href="#menu" onClick={close} className="btn-accent mt-7">
                  Browse the Menu
                </a>
              </div>
            ) : step === 'checkout' ? (
              <div className="nice-scroll flex-1 overflow-y-auto px-6 py-6">
                <CheckoutForm
                  onSuccess={() => {
                    clearCart();
                    setStep('done');
                  }}
                />
              </div>
            ) : (
              <>
                {/* Free delivery meter */}
                <div className="border-b border-beige px-6 py-4">
                  <p className="flex items-center gap-2 text-sm text-forest">
                    <Truck className="h-4 w-4 text-burnt" />
                    {deliveryFee === 0 ? (
                      <span className="font-semibold">You’ve unlocked free delivery!</span>
                    ) : (
                      <span>
                        Add <strong>{money(FREE_DELIVERY_FROM - subtotal)}</strong> more for free delivery
                      </span>
                    )}
                  </p>
                  <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-beige">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-forest to-burnt"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="nice-scroll flex-1 divide-y divide-beige overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-4 py-5"
                      >
                        <img
                          src={item.image}
                          alt=""
                          className="h-18 w-18 shrink-0 rounded-2xl object-cover"
                          width={72}
                          height={72}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-serif text-lg leading-snug text-forest">{item.name}</p>
                          <p className="mt-0.5 text-sm text-charcoal/55">{money(item.price)} each</p>
                          <div className="mt-2 flex items-center gap-3">
                            <div className="flex items-center rounded-full border border-beige bg-white">
                              <button
                                type="button"
                                onClick={() => setQty(item.id, item.qty - 1)}
                                aria-label={`Decrease quantity of ${item.name}`}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-forest transition-colors hover:bg-beige"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-7 text-center text-sm font-bold" aria-live="polite">
                                {item.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => setQty(item.id, item.qty + 1)}
                                aria-label={`Increase quantity of ${item.name}`}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-forest transition-colors hover:bg-beige"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.name}`}
                              className="text-charcoal/40 transition-colors hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <p className="font-serif text-lg font-bold text-forest">{money(item.price * item.qty)}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Summary */}
                <div className="border-t border-beige bg-white px-6 py-5">
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between text-charcoal/65">
                      <dt>Subtotal</dt>
                      <dd>{money(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between text-charcoal/65">
                      <dt>Delivery fee</dt>
                      <dd>{deliveryFee === 0 ? 'Free' : money(deliveryFee)}</dd>
                    </div>
                    <div className="flex justify-between border-t border-beige pt-3 font-serif text-xl font-bold text-forest">
                      <dt>Total</dt>
                      <dd>{money(total)}</dd>
                    </div>
                  </dl>
                  <button type="button" onClick={() => setStep('checkout')} className="btn-accent mt-4 w-full">
                    Proceed to Checkout
                  </button>
                  <p className="mt-2.5 text-center text-xs text-charcoal/45">
                    Demo checkout · Delivery fee is {money(DELIVERY_FEE)} (free over {money(FREE_DELIVERY_FROM)})
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
