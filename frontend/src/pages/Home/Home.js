import React from 'react';

import FeaturedAccommodations from './components/FeaturedAccommodations';
import FeaturedEvents from './components/FeaturedEvents';
import Hero from './components/Hero';
import QuickStats from './components/QuickStats';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <QuickStats />
      <FeaturedEvents />
      <FeaturedAccommodations />
    </div>
  );
};

export default Home;