import React, { useRef, useEffect } from 'react';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';

import PlayerDevelopment from './components/PlayerDevelopment';
import Gallery from './components/Gallery';
import Programs from './components/Programs';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import SocialUpdates from './components/SocialUpdates';
import Locations from './components/Locations';
import Footer from './components/Footer';
import StickyFooter from './components/StickyFooter';
import FloatingCTA from './components/FloatingCTA';
import FAQPage from './pages/FAQPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import TorchlightCursor from './components/TorchlightCursor';

function HomePage() {
  return (
    <>
      <div className="main-content-wrapper">
        <Header />
        <Hero />
        <AboutUs />
        <PlayerDevelopment />
        <Programs />
        <Team />
        <Gallery />
        <SocialUpdates />
        <Testimonials />
        <Locations />
      </div>
      <Footer />
      <FloatingCTA />
      <StickyFooter />
    </>
  );
}

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  const prevPathnameRef = useRef(null);

  useEffect(() => {
    const prevPathname = prevPathnameRef.current;
    prevPathnameRef.current = pathname;

    if (!hash) {
      // Only scroll to top when navigating to a non-hash page
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
      return;
    }

    const samePageNav = prevPathname === pathname; // already on '/', clicking another section

    if (samePageNav) {
      // ── Same-page navigation ──────────────────────────────────
      // GSAP is already initialized, all pin spacers exist.
      // Just scroll directly to the element — no reset needed.
      requestAnimationFrame(() => {
        const target = document.querySelector(hash);
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        const scrollTarget = Math.max(0, absoluteTop - 90);
        if (lenis) {
          lenis.scrollTo(scrollTarget, { duration: 1.2 });
        } else {
          window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
        }
      });
      return;
    }

    // ── Cross-page navigation (from /faq, /contact, /gallery → /#section) ──
    // Stage 1: Reset to top so GSAP pin spacers initialize from position 0.
    window.scrollTo(0, 0);
    if (lenis) lenis.scrollTo(0, { immediate: true });

    // Stage 2: Wait for React + GSAP to mount and compute all pin spacer heights,
    // then ScrollTrigger.refresh() to finalize positions, then scroll.
    const timer = setTimeout(() => {
      ScrollTrigger.refresh(true);

      requestAnimationFrame(() => {
        const target = document.querySelector(hash);
        if (!target) return;

        const rect = target.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        const scrollTarget = Math.max(0, absoluteTop - 90);

        if (lenis) {
          lenis.scrollTo(scrollTarget, { duration: 1.5 });
        } else {
          window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
        }
      });
    }, 900);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hash]);

  return null;
}


function App() {
  const lenisRef = useRef();

  // Connect GSAP ticker to Lenis for perfect ScrollTrigger sync
  useEffect(() => {
    function update(time) {
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.raf(time * 1000);
      }
    }

    gsap.ticker.add(update);
    // Disable lag smoothing — with Lenis drive the ticker, any catch-up burst
    // from lagSmoothing creates the visible 'stuck' freeze between pinned sections
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.config({ ignoreMobileResize: true });
    ScrollTrigger.normalizeScroll(false);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
    }
  }, []);

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false} options={{ smoothTouch: true, lerp: 0.08, infinite: false, syncTouch: true }}>
      <ScrollToHash />
      <TorchlightCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </ReactLenis>
  );
}

export default App;
