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
    <section>
      <h2 className="text-4xl font-bold text-center mb-12">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Why Build a Directory Website?
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <blockquote className="twitter-tweet">
          <a href="https://twitter.com/KintuLabs/status/1760938279141269853?ref_src=twsrc%5Etfw">View the directory revenue examples</a>
        </blockquote>

        <blockquote className="twitter-tweet">
          <a href="https://twitter.com/levelsio/status/1101097126967140352?ref_src=twsrc%5Etfw">View the RemoteOK revenue milestone</a>
        </blockquote>

        <blockquote className="twitter-tweet">
          <a href="https://twitter.com/afonsolfm/status/1689003294201614336?ref_src=twsrc%5Etfw">View the directory monetization strategy</a>
        </blockquote>

        <blockquote className="twitter-tweet">
          <a href="https://twitter.com/no_fear_inc/status/1885018805618819203?ref_src=twsrc%5Etfw">View the portfolio success story</a>
        </blockquote>

        <blockquote className="twitter-tweet">
          <a href="https://twitter.com/staticmaker1/status/1874990726771249487?ref_src=twsrc%5Etfw">View the hotel directory success story</a>
        </blockquote>

        <blockquote className="twitter-tweet">
          <a href="https://twitter.com/rrmdp/status/1885036318276596011?ref_src=twsrc%5Etfw">View the job board directory success story</a>
        </blockquote>
      </div>

      <div className="text-center mt-12">
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
         Start yours today with DirectoryMaker.
        </p>
      </div>
    </section>
  );
};

export default WhyDirectoriesSection;