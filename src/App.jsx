import React, { useEffect, useRef } from 'react';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Founders from './components/Founders';
import PlayerDevelopment from './components/PlayerDevelopment';
import Gallery from './components/Gallery';
import Programs from './components/Programs';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
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
        <Testimonials />
      </div>
      <Footer />
      <FloatingCTA />
      <StickyFooter />
    </>
  );
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
