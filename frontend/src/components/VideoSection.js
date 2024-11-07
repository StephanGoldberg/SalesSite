import React from 'react';

function VideoSection() {
  return (
    <section className="w-screen bg-black py-20 overflow-hidden relative">
      {/* Gradient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(128,90,213,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(76,29,149,0.15),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Watch How It Works
          </span>
        </h2>
        
        <div className="max-w-4xl mx-auto"> {/* Added container for width control */}
          <div className="relative backdrop-blur-sm bg-gray-900/30 p-6 rounded-2xl border border-purple-900/20 shadow-[0_0_40px_rgba(139,92,246,0.1)]">
            {/* Light effect for glass morphism */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-pink-900/10 rounded-2xl" />
            
            <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/NJVJ5iBst7Y"
                title="Directory Maker Presentation"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;