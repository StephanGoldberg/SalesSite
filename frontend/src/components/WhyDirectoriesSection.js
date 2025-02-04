import React from 'react';

const WhyDirectoriesSection = () => {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charSet = "utf-8";
    document.body.appendChild(script);
    
    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
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
          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">
              Loading tweet...
            </p>
            <a href="https://twitter.com/KintuLabs/status/1760938279141269853">View tweet about directories revenue by @KintuLabs</a>
          </blockquote>

          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">
              Loading tweet...
            </p>
            <a href="https://twitter.com/levelsio/status/1101097126967140352">View tweet about RemoteOK revenue by @levelsio</a>
          </blockquote>

          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">
              Loading tweet...
            </p>
            <a href="https://twitter.com/afonsolfm/status/1689003294201614336">View tweet about directory monetization by @afonsolfm</a>
          </blockquote>

          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">
              Loading tweet...
            </p>
            <a href="https://twitter.com/no_fear_inc/status/1885018805618819203">View tweet about directory portfolio by @no_fear_inc</a>
          </blockquote>

          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">
              Loading tweet...
            </p>
            <a href="https://twitter.com/staticmaker1/status/1874990726771249487">View tweet about luxury hotel directory by @staticmaker1</a>
          </blockquote>

          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">
              Loading tweet...
            </p>
            <a href="https://twitter.com/rrmdp/status/1885036318276596011">View tweet about job board directory by @rrmdp</a>
          </blockquote>
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