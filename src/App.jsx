import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Founders from './components/Founders';
import PlayerDevelopment from './components/PlayerDevelopment';
import Gallery from './components/Gallery';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <AboutUs />
      <Founders />
      <PlayerDevelopment />
      <Gallery />
    </div>
  );
}

export default App;
