import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import ImageGallerySection from '../components/ImageGallerySection';
import PricingSection from '../components/PricingSection';
import FAQSection from '../components/FAQSection';

function Home() {
  return (
    <div className="container mx-auto my-16 px-8">  {/* Increased margin and padding */}
      <HeroSection />
      <FeaturesSection />
      <ImageGallerySection />
      <PricingSection />
      <FAQSection />
    </div>
  );
}

export default Home;




