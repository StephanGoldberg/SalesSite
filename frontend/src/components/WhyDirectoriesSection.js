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
          <div className="backdrop-blur-sm bg-gray-900/30 rounded-xl border border-purple-900/20 overflow-hidden p-4">
            <blockquote className="twitter-tweet">
              <p lang="en" dir="ltr">
                Directories that print money:<br />• SaaS Hub .com - $120k/yr<br />• Sober Nation .com - $250k/yr<br />• Disk Prices .com - $60k/yr<br />• Book A Magician .com - $30k/yr<br />• Nomad List .com - $360k/yr
                <a href="https://twitter.com/KintuLabs/status/1760938279141269853">February 23, 2024</a>
              </p>
            </blockquote>
          </div>

          <div className="backdrop-blur-sm bg-gray-900/30 rounded-xl border border-purple-900/20 overflow-hidden p-4">
            <blockquote className="twitter-tweet">
              <p lang="en" dir="ltr">
                👩‍💻 RemoteOK just passed $35,000/mo revenue (or $420,000/y extrapolated), which is now about $2k higher than Nomad List
                <a href="https://twitter.com/levelsio/status/1101097126967140352">February 28, 2019</a>
              </p>
            </blockquote>
          </div>

          <div className="backdrop-blur-sm bg-gray-900/30 rounded-xl border border-purple-900/20 overflow-hidden p-4">
            <blockquote className="twitter-tweet">
              <p lang="en" dir="ltr">
                let's say you have a directory website<br /><br />you monetise on listings<br /><br />5 listings @ $29/month is $145 MRR<br />10 listings @ $49/month is $490 MRR<br />20 listings @ $99/month is $1980 MRR
                <a href="https://twitter.com/afonsolfm/status/1689003294201614336">August 8, 2023</a>
              </p>
            </blockquote>
          </div>

          <div className="backdrop-blur-sm bg-gray-900/30 rounded-xl border border-purple-900/20 overflow-hidden p-4">
            <blockquote className="twitter-tweet">
              <p lang="en" dir="ltr">
                Scaling the portfolio of directories is one of the disruptive movers this month.
                <a href="https://twitter.com/no_fear_inc/status/1885018805618819203">January 30, 2024</a>
              </p>
            </blockquote>
          </div>

          <div className="backdrop-blur-sm bg-gray-900/30 rounded-xl border border-purple-900/20 overflow-hidden p-4">
            <blockquote className="twitter-tweet">
              <p lang="en" dir="ltr">
                "boring" luxury hotel directory site.<br />founded by a husband and wife team.<br />bootstrapped business.<br />monetization via membership.<br />sold for $67 million in 2023.
                <a href="https://twitter.com/staticmaker1/status/1874990726771249487">January 3, 2024</a>
              </p>
            </blockquote>
          </div>

          <div className="backdrop-blur-sm bg-gray-900/30 rounded-xl border border-purple-900/20 overflow-hidden p-4">
            <blockquote className="twitter-tweet">
              <p lang="en" dir="ltr">
                One man working remotely<br />Bootstrapping<br />No ads<br />A simple meta directory of job boards<br />Passed $59K
                <a href="https://twitter.com/rrmdp/status/1885036318276596011">January 30, 2024</a>
              </p>
            </blockquote>
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