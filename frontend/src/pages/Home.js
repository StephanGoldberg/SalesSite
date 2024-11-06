
import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import ImageGallerySection from '../components/ImageGallerySection';
import PricingSection from '../components/PricingSection';
import VideoSection from '../components/VideoSection';
import FAQSection from '../components/FAQSection';

function Home() {
  return (
    <div className="container mx-auto mt-16 mb-16 px-8">
      <HeroSection />
      <FeaturesSection />
      <ImageGallerySection />
      <PricingSection />
      <VideoSection />
      <FAQSection />
    </div>
  );
}

export default Home;