import React from 'react';

const WhyDirectoriesSection = () => {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://platform.x.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="w-screen bg-black py-20 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(128,90,213,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(76,29,149,0.15),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Why Build a Directory Website?
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* First Post - Various Directories */}
          <div className="backdrop-blur-sm bg-gray-900/30 rounded-xl border border-purple-900/20 overflow-hidden p-4">
            <div id="tweet1">
              <blockquote className="twitter-tweet">
                <a href="https://twitter.com/KintuLabs/status/1760938279141269853"></a>
              </blockquote>
            </div>
          </div>

          {/* Second Post - RemoteOK Revenue */}
          <div className="backdrop-blur-sm bg-gray-900/30 rounded-xl border border-purple-900/20 overflow-hidden p-4">
            <div id="tweet2">
              <blockquote className="twitter-tweet">
                <a href="https://twitter.com/levelsio/status/1101097126967140352"></a>
              </blockquote>
            </div>
          </div>

          {/* Third Post - Directory Monetization */}
          <div className="backdrop-blur-sm bg-gray-900/30 rounded-xl border border-purple-900/20 overflow-hidden p-4">
            <div id="tweet3">
              <blockquote className="twitter-tweet">
                <a href="https://twitter.com/afonsolfm/status/1689003294201614336"></a>
              </blockquote>
            </div>
          </div>

          {/* Fourth Post - Portfolio of Directories */}
          <div className="backdrop-blur-sm bg-gray-900/30 rounded-xl border border-purple-900/20 overflow-hidden p-4">
            <div id="tweet4">
              <blockquote className="twitter-tweet">
                <a href="https://twitter.com/no_fear_inc/status/1885018805618819203"></a>
              </blockquote>
            </div>
          </div>

          {/* Fifth Post - Luxury Hotel Directory */}
          <div className="backdrop-blur-sm bg-gray-900/30 rounded-xl border border-purple-900/20 overflow-hidden p-4">
            <div id="tweet5">
              <blockquote className="twitter-tweet">
                <a href="https://twitter.com/staticmaker1/status/1874990726771249487"></a>
              </blockquote>
            </div>
          </div>

          {/* Sixth Post - Job Board Directory */}
          <div className="backdrop-blur-sm bg-gray-900/30 rounded-xl border border-purple-900/20 overflow-hidden p-4">
            <div id="tweet6">
              <blockquote className="twitter-tweet">
                <a href="https://twitter.com/rrmdp/status/1885036318276596011"></a>
              </blockquote>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Directory websites are proven money-makers. Start yours today with DirectoryMaker.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyDirectoriesSection;