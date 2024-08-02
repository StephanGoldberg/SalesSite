import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function ImageGallerySection() {
  const images = [
  
    '/images/hero.jpg',
    '/images/add.jpg',
    '/images/admin.jpg',
    '/images/sponsorship.jpg',
    '/images/signin.jpg',
    '/images/profile.jpg',

  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Looks</h2>
        <div className="bg-black p-4 rounded-lg">  {/* Add a black background and padding */}
          <Carousel 
            showThumbs={false} 
            infiniteLoop 
            useKeyboardArrows 
            autoPlay 
            dynamicHeight={false} 
            showArrows={true} // Enable arrows
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button type="button" onClick={onClickHandler} title={label} className="absolute left-0 z-10 p-2 bg-gray-700 text-white rounded-full opacity-75 hover:opacity-100">
                  &#10094; {/* Unicode for left arrow */}
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button type="button" onClick={onClickHandler} title={label} className="absolute right-0 z-10 p-2 bg-gray-700 text-white rounded-full opacity-75 hover:opacity-100">
                  &#10095; {/* Unicode for right arrow */}
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
                  style={{ maxHeight: '400px', width: 'auto' }} // Smaller size
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




