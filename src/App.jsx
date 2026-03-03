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
    gsap.ticker.lagSmoothing(500, 16);

    ScrollTrigger.config({ ignoreMobileResize: true });
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
    }
  }, []);

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false} options={{ smoothTouch: true, lerp: 0.15, infinite: false, syncTouch: true }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
      <FloatingCTA />
      <StickyFooter />
    </ReactLenis>
  );
}

export default App;
