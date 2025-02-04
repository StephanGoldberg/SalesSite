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
            <p lang="en" dir="ltr">Directories that print money:<br />• SaaS Hub .com - $120k/yr<br />• Sober Nation .com - $250k/yr<br />• Disk Prices .com - $60k/yr<br />• Book A Magician .com - $30k/yr<br />• Nomad List .com - $360k/yr</p>
            <p>— Chris Osborne (@KintuLabs)</p>
            <a href="https://twitter.com/KintuLabs/status/1760938279141269853?ref_src=twsrc%5Etfw">Directory revenue examples - February 23, 2024</a>
          </blockquote>

          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">👩‍💻 RemoteOK.io just passed $35,000/mo revenue (or $420,000/y extrapolated), which is now about $2k higher than NomadList.com</p>
            <p>— @levelsio (@levelsio)</p>
            <a href="https://twitter.com/levelsio/status/1101097126967140352?ref_src=twsrc%5Etfw">RemoteOK revenue milestone - February 28, 2019</a>
          </blockquote>

          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">let&apos;s say you have a directory website<br />you monetise on listings<br />5 listings @ $29/month is $145 MRR<br />10 listings @ $49/month is $490 MRR<br />20 listings @ $99/month is $1980 MRR</p>
            <p>— Afonso Matos 🇵🇹 (@afonsolfm)</p>
            <a href="https://twitter.com/afonsolfm/status/1689003294201614336?ref_src=twsrc%5Etfw">Directory monetization strategy - August 8, 2023</a>
          </blockquote>

          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">Scaling the portfolio of directories is one of the disruptive movers this month.</p>
            <p>— Mario Peshev (@no_fear_inc)</p>
            <a href="https://twitter.com/no_fear_inc/status/1885018805618819203?ref_src=twsrc%5Etfw">Directory portfolio success story - January 30, 2024</a>
          </blockquote>

          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">&quot;boring&quot; luxury hotel directory site. bootstrapped business. sold for $67 million in 2023.</p>
            <p>— staticmaker (@staticmaker1)</p>
            <a href="https://twitter.com/staticmaker1/status/1874990726771249487?ref_src=twsrc%5Etfw">Hotel directory success story - January 3, 2024</a>
          </blockquote>

          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">One man working remotely. Bootstrapping. No ads. A simple meta directory of job boards. Passed $59K</p>
            <p>— Rodrigo Rocco (@rrmdp)</p>
            <a href="https://twitter.com/rrmdp/status/1885036318276596011?ref_src=twsrc%5Etfw">Job board directory success story - January 30, 2024</a>
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