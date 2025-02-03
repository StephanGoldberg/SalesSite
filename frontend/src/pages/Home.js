
import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import ImageGallerySection from '../components/ImageGallerySection';
import PricingSection from '../components/PricingSection';
import VideoSection from '../components/VideoSection';
import FAQSection from '../components/FAQSection';
import SEO from '../components/SEO';

function Home() {
  return (
    <>
    <SEO 
  title="Directory Maker - Build Professional Directory & Listing Websites"
  description="Launch your directory website in minutes. Complete solution with advanced search, user management, and monetization features. Perfect for business directories, job boards, and listing sites."
  canonicalUrl="/"
  keywords="directory website builder, listing website template, business directory software, white label directory solution, directory boilerplate"
/>

    <div className="container mx-auto mt-16 mb-16 px-8">
      <HeroSection />
      <FeaturesSection />
      <ImageGallerySection />
      <PricingSection />
      <VideoSection />
      <FAQSection />
    </div>
    </>
  );
}

export default Home;