import React from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Founders from './components/Founders';
import PlayerDevelopment from './components/PlayerDevelopment';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import FAQPage from './pages/FAQPage';

function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <AboutUs />
      <Founders />
      <PlayerDevelopment />
      <Gallery />
      <Footer />
    </>
  );
}

function App() {
  return (
    <ReactLenis root options={{ smoothTouch: true, lerp: 0.1 }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </ReactLenis>
  );
}

export default App;
