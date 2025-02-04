import React from 'react';

function HeroSection() {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-screen bg-black pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(128,90,213,0.3),transparent_80%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.25),transparent_100%)]" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-medium mb-4 text-white">
          Unlock Lifetime Access to
        </h1>
        <h2 
          className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 font-extrabold mb-4"
          style={{
            fontSize: 'clamp(2rem, 5vw, 6rem)', 
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          DirectoryMaker
        </h2>
        <p className="text-xl sm:text-2xl text-gray-300 mb-8">
          Your complete directory business solution – all features, one payment
        </p>
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={scrollToPricing}
            className="bg-white text-blue-700 py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300"
          >
            Get DirectoryMaker
          </button>
          <a 
            href="https://directory-maker.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline transition duration-300"
          >
            View Demo Site
            <span className="block text-xs mt-1 opacity-75">
              (Admin credentials upon request)
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

















