import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function ImageGallerySection() {
  const images = [
    'images/1.jpg',
    'images/2.jpg',
    'images/3.jpg',
    'images/4.jpg',
    'images/5.jpg',
    'images/6.jpg',
    'images/7.jpg',
    'images/8.jpg',
    'images/9.jpg'
  ];

  return (
    <section className="w-screen bg-black py-20 overflow-hidden relative">
      {/* Gradient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_-20%,rgba(128,90,213,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_120%,rgba(76,29,149,0.15),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Preview Gallery
          </span>
        </h2>
        
        <div className="relative backdrop-blur-sm bg-gray-900/30 p-6 rounded-2xl border border-purple-900/20 shadow-[0_0_40px_rgba(139,92,246,0.1)]">
          {/* Light effect for glass morphism */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-pink-900/10 rounded-2xl" />
          
          <div className="max-w-4xl mx-auto"> {/* Added max-width container */}
            <Carousel 
              showThumbs={false} 
              infiniteLoop 
              useKeyboardArrows 
              autoPlay 
              interval={5000}
              dynamicHeight={false} 
              showArrows={true}
              showStatus={false}
              showIndicators={true}
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button 
                    type="button" 
                    onClick={onClickHandler} 
                    title={label} 
                    className="absolute left-4 z-10 p-3 bg-black/50 backdrop-blur-md text-white rounded-full 
                             opacity-75 hover:opacity-100 hover:bg-black/70 transition-all duration-300
                             border border-white/10 shadow-lg"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button 
                    type="button" 
                    onClick={onClickHandler} 
                    title={label} 
                    className="absolute right-4 z-10 p-3 bg-black/50 backdrop-blur-md text-white rounded-full 
                             opacity-75 hover:opacity-100 hover:bg-black/70 transition-all duration-300
                             border border-white/10 shadow-lg"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )
              }
            >
              {images.map((src, index) => (
                <div key={index} className="relative px-4 pb-4">
                  <div className="relative" style={{ maxHeight: '500px' }}> {/* Controlled height */}
                    <img 
                      src={src} 
                      alt={`Screenshot ${index + 1}`} 
                      className="mx-auto object-contain h-full"
                      style={{ maxHeight: '500px', width: 'auto' }}
                      onError={(e) => {
                        console.error(`Failed to load image: ${src}`);
                        e.target.onerror = null;
                        e.target.src = 'images/placeholder.jpg';
                      }}
                    />
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Custom indicators styling */}
          <style jsx global>{`
            .carousel .control-dots {
              margin: 16px 0;
            }
            .carousel .control-dots .dot {
              background: #9333ea;
              box-shadow: none;
              opacity: 0.4;
            }
            .carousel .control-dots .dot.selected {
              opacity: 1;
            }
            .carousel .slide {
              background: transparent;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

export default ImageGallerySection;
