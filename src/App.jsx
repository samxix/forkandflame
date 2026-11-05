import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MenuSection from './components/MenuSection';
import Reservation from './components/Reservation';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <MenuSection />
        <Reservation />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
