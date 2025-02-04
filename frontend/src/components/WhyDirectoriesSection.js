import React from 'react';

const WhyDirectoriesSection = () => {
  React.useEffect(() => {
    // If the Twitter script isn't already loaded, add it.
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charSet = "utf-8";
      script.onload = () => {
        if (window.twttr && window.twttr.widgets) {
          window.twttr.widgets.load();
        }
      };
      document.body.appendChild(script);
      return () => {
        if (script && script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    } else {
      // If already loaded, just re-parse the tweet elements.
      window.twttr.widgets.load();
    }
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
          {/* Tweet 1 */}
          <div>
            <blockquote className="twitter-tweet">
              <p lang="en" dir="ltr">
                Directories that print money:
                <br /><br />
                • SaaS Hub .com - $120k/yr
                <br />
                • Sober Nation .com - $250k/yr
                <br />
                • Disk Prices .com - $60k/yr
                <br />
                • Book A Magician .com - $30k/yr
                <br />
                • Nomad List .com - $360k/yr
              </p>
              &mdash; Chris Osborne (@KintuLabs){" "}
              <a href="https://twitter.com/KintuLabs/status/1760938279141269853?ref_src=twsrc%5Etfw">
                February 23, 2024
              </a>
            </blockquote>
          </div>

          {/* Tweet 2 */}
          <div>
            <blockquote className="twitter-tweet">
              <p lang="en" dir="ltr">
                👩‍💻 <a href="https://t.co/LXa46PgDiR">https://t.co/LXa46PgDiR</a> just passed $35,000/mo revenue (or $420,000/y extrapolated), which is now about $2k higher than 🎒 <a href="https://t.co/VbTTH3ltoQ">https://t.co/VbTTH3ltoQ</a> 😲
                <br /><br />
                Main reason: 🛍 volume sales (5-20x job posts in a bundle sold to bigger companies).
                <br /><br />
                📊 Live data: <a href="https://t.co/jV1gZhhcqc">https://t.co/jV1gZhhcqc</a> <a href="https://t.co/0I7Bp2ss45">pic.twitter.com/0I7Bp2ss45</a>
              </p>
              &mdash; @levelsio (@levelsio){" "}
              <a href="https://twitter.com/levelsio/status/1101097126967140352?ref_src=twsrc%5Etfw">
                February 28, 2019
              </a>
            </blockquote>
          </div>

          {/* Tweet 3 */}
          <div>
            <blockquote className="twitter-tweet">
              <p lang="en" dir="ltr">
                let's say you have a directory website
                <br /><br />
                you monetise on listings
                <br /><br />
                5 listings @ $29/month is $145 MRR
                <br />
                10 listings @ $49/month is $490 MRR
                <br />
                20 listings @ $99/month is $1980 MRR
                <br /><br />
                the hard part is building the platform &amp; promoting it!
                <br /><br />
                with nichebase you cut the effort in half
              </p>
              &mdash; Afonso Matos 🇵🇹 (@afonsolfm){" "}
              <a href="https://twitter.com/afonsolfm/status/1689003294201614336?ref_src=twsrc%5Etfw">
                August 8, 2023
              </a>
            </blockquote>
          </div>

          {/* Tweet 4 */}
          <div>
            <blockquote className="twitter-tweet">
              <p lang="en" dir="ltr">
                Scaling the portfolio of directories is one of the disruptive movers this month.
                <br /><br />
                I launched most of them around November - and they're picking up hard.
                <br /><br />
                Also, directory submissions pop up daily. Which is an active signal that the portfolio works (as confirmed by the GSC… <a href="https://t.co/C3B8O04mzR">pic.twitter.com/C3B8O04mzR</a>
              </p>
              &mdash; Mario Peshev (@no_fear_inc){" "}
              <a href="https://twitter.com/no_fear_inc/status/1885018805618819203?ref_src=twsrc%5Etfw">
                January 30, 2025
              </a>
            </blockquote>
          </div>

          {/* Tweet 5 */}
          <div>
            <blockquote className="twitter-tweet">
              <p lang="en" dir="ltr">
                "boring" luxury hotel directory site.
                <br /><br />
                founded by a husband and wife team.
                <br /><br />
                bootstrapped business.
                <br /><br />
                monetization via membership.
                <br /><br />
                sold for $67 million in 2023.
                <a href="https://t.co/lExHsy5XSl">https://t.co/lExHsy5XSl</a>{" "}
                <a href="https://t.co/G5xZvut96R">pic.twitter.com/G5xZvut96R</a>
              </p>
              &mdash; staticmaker (@staticmaker1){" "}
              <a href="https://twitter.com/staticmaker1/status/1874990726771249487?ref_src=twsrc%5Etfw">
                January 3, 2025
              </a>
            </blockquote>
          </div>

          {/* Tweet 6 */}
          <div>
            <blockquote className="twitter-tweet">
              <p lang="en" dir="ltr">
                One man working remotely
                <br /><br />
                Bootstrapping
                <br /><br />
                No ads
                <br /><br />
                A simple meta directory of job boards 
                <br /><br />
                Passed $59K
                <br /><br />
                You can too 💪<a href="https://twitter.com/hashtag/buildinpublic?src=hash&ref_src=twsrc%5Etfw">#buildinpublic</a>{" "}
                <a href="https://t.co/ve7v4tbs7x">pic.twitter.com/ve7v4tbs7x</a>
              </p>
              &mdash; Rodrigo Rocco 👨‍💻📈📗 from JobBoardSearch 🔎 (@rrmdp){" "}
              <a href="https://twitter.com/rrmdp/status/1885036318276596011?ref_src=twsrc%5Etfw">
                January 30, 2025
              </a>
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
