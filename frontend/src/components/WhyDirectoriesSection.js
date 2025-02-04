import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const tweets = [
  { tweetId: '1760938279141269853' },
  { tweetId: '1101097126967140352' },
  { tweetId: '1689003294201614336' },
  { tweetId: '1885018805618819203' },
  { tweetId: '1874990726771249487' },
  { tweetId: '1885036318276596011' }
];

const WhyDirectoriesSection = () => {
  return (
    <section className="w-screen bg-black py-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Why Build a Directory Website?
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tweets.map(({ tweetId }, index) => (
            <div key={index} className="bg-white p-4 rounded">
              <TwitterTweetEmbed tweetId={tweetId} options={{ theme: 'light' }} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-xl text-white max-w-3xl mx-auto">
            Directory websites are proven money-makers. Start yours today with DirectoryMaker.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyDirectoriesSection;




