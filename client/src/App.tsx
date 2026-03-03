import { useEffect, useRef } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import { CartProvider, useCart } from "./contexts/CartContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import BrandStory from "./pages/BrandStory";
import Product35mmF2 from "./pages/Product35mmF2";
import Product35mmF2Special from "./pages/Product35mmF2Special";
import Product35mmF2Intro from "./pages/Product35mmF2Intro";
import Product35mmF2SpecialIntro from "./pages/Product35mmF2SpecialIntro";
import ServiceSupport from "./pages/ServiceSupport";
import Gallery from "./pages/Gallery";
import MediaReviews from "./pages/MediaReviews";


function Router() {
  const { itemCount } = useCart();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Drive silk gradient flow with page scroll progress
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const t = total > 0 ? Math.min(window.scrollY / total, 1) : 0;
      el.style.setProperty('--silk-t', t.toFixed(4));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={wrapperRef} className="max-w-[1440px] mx-auto silk-bg min-h-screen relative elevation-3">
      <Header cartCount={itemCount} />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/story" component={BrandStory} />
        <Route path="/products" component={Products} />
        <Route path="/products/35mm-f2-intro" component={Product35mmF2Intro} />
        <Route path="/products/35mm-f2-special-intro" component={Product35mmF2SpecialIntro} />
        <Route path="/products/35mm-f2" component={Product35mmF2} />
        <Route path="/products/35mm-f2-special" component={Product35mmF2Special} />
        <Route path="/products/:id" component={ProductDetail} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/support" component={ServiceSupport} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/reviews" component={MediaReviews} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <CartProvider>
          <ThemeProvider
            defaultTheme="light"
            // switchable
          >
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </ThemeProvider>
        </CartProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
