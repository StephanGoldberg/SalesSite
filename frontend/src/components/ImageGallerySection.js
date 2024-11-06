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
    'images/6.jpg'
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">How It Looks</h2>
        <div className="bg-gray-800 p-4 rounded-lg">
          <Carousel 
            showThumbs={false} 
            infiniteLoop 
            useKeyboardArrows 
            autoPlay 
            interval={5000}
            dynamicHeight={false} 
            showArrows={true}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button 
                  type="button" 
                  onClick={onClickHandler} 
                  title={label} 
                  className="absolute left-0 z-10 p-2 bg-gray-700 text-white rounded-full opacity-75 hover:opacity-100"
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                  &#10094;
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button 
                  type="button" 
                  onClick={onClickHandler} 
                  title={label} 
                  className="absolute right-0 z-10 p-2 bg-gray-700 text-white rounded-full opacity-75 hover:opacity-100"
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                  &#10095;
                </button>
              )
            }
          >
            {images.map((src, index) => (
              <div key={index} className="flex justify-center">
                <img 
                  src={src} 
                  alt={`Screenshot ${index + 1}`} 
                  className="max-w-full h-auto object-contain"
                  style={{ maxHeight: '400px', width: 'auto' }}
                  onError={(e) => {
                    console.error(`Failed to load image: ${src}`);
                    e.target.onerror = null;
                    e.target.src = 'images/placeholder.jpg';
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default ImageGallerySection;
