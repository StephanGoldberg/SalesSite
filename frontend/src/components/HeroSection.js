import React from 'react';

function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 py-16">  {/* Gradient background */}
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Create Professional <span className="font-extrabold underline">Directories</span> with Ease
          </h1>
          <p className="text-xl text-blue-100 mb-8">Get instant access to our powerful Directory Maker boilerplate</p>
          <a href="#buy" className="bg-white text-blue-600 py-3 px-8 rounded-full hover:bg-gray-100">
            Buy Now - $79
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;












