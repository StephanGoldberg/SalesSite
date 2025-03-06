import React from 'react';

function ShowcaseSection() {
  return (
    <section className="w-screen bg-black pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(128,90,213,0.3),transparent_80%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.25),transparent_100%)]" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-medium mb-4 text-white">
            Built with <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 font-extrabold">DirectoryMaker</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 mb-12">
            See real-world examples of successful directories
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Screenshot */}
          <div className="group relative rounded-xl overflow-hidden shadow-2xl shadow-purple-900/20 border border-purple-900/30 transition-all duration-500 hover:shadow-purple-500/30 hover:border-purple-500/50">
            <div className="aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a 
                  href="https://www.esteticapro.ro/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-blue-700 py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300"
                >
                  Visit Website
                </a>
              </div>
              <img 
                src="images/esteticapro-screenshot.jpg" 
                alt="EsteticaPro Website" 
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/api/placeholder/800/450";
                }}
              />
            </div>
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm py-1 px-3 rounded-full">
              <div className="flex items-center space-x-1">
                <span className="block w-2 h-2 rounded-full bg-red-500"></span>
                <span className="block w-2 h-2 rounded-full bg-yellow-500"></span>
                <span className="block w-2 h-2 rounded-full bg-green-500"></span>
              </div>
            </div>
          </div>
          
          {/* Right side - Details */}
          <div className="text-left">
            <h3 className="text-2xl font-bold text-white mb-4">
              EsteticaPro
            </h3>
            <p className="text-xl text-gray-300 mb-6">
              A comprehensive beauty service directory website serving Romania. Features a searchable database of beauty professionals and services.
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-purple-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Beauty services directory</span>
              </div>
              <div className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-purple-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Localized for Romanian market</span>
              </div>
              <div className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-purple-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Advanced search & filtering</span>
              </div>
              <div className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-purple-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Mobile responsive design</span>
              </div>
            </div>
            <div className="mt-8">
              <a 
                href="https://www.esteticapro.ro/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-blue-700 py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 inline-block"
              >
                Visit EsteticaPro
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-20 text-center">
          <p className="text-xl sm:text-2xl text-gray-300 mb-8">
            Ready to build your own directory business?
          </p>
          <button
            onClick={() => {
              const pricingSection = document.getElementById('pricing');
              if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-white text-blue-700 py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300"
          >
            Get DirectoryMaker
          </button>
        </div>
      </div>
    </section>
  );
}

export default ShowcaseSection;