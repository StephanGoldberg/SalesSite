import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function PricingSection() {
  const handlePurchase = async (planType = 'standard') => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/create-checkout-session`,
        { planType },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: response.data.id });
    } catch (error) {
      console.error('Error initiating checkout:', error);
      alert('Failed to initiate checkout. Please try again.');
    }
  };

  return (
    <section id="pricing" className="w-full bg-gradient-to-b from-black via-purple-900 to-black py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Exclusive Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Standard License */}
          <div className="max-w-lg mx-auto bg-gray-900 rounded-lg shadow-xl overflow-hidden w-full">
            <div className="px-6 py-12">
              <h3 className="text-3xl font-semibold text-center mb-4 text-white">Standard License</h3>
              <div className="text-center mb-4">
                <div className="flex items-center justify-center">
                  <span className="text-5xl font-bold text-white">$79</span>
                  <div className="ml-2 text-left">
                    <span className="text-gray-400 block">one-time payment</span>
                    <span className="text-gray-400 line-through text-sm">Regular $199</span>
                  </div>
                </div>
              </div>
              <div className="bg-purple-900/30 rounded-lg p-4 mb-8 border border-purple-500/20">
                <p className="text-center font-medium text-purple-200 mb-1">
                  🚀 Launch Special - Save $120
                </p>
                <p className="text-center text-purple-200 text-sm">
                  Limited to first 100 customers
                </p>
                <p className="text-center text-purple-200 text-sm">
                  Lock in this price now
                </p>
              </div>
              <ul className="text-lg text-gray-300 mb-10 space-y-3">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Full access to Directory Maker
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Lifetime updates included
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Private GitHub repository access
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Access to future premium features
                </li>
              </ul>
              <button
                onClick={() => handlePurchase('standard')}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-bold hover:opacity-90 transition duration-300"
              >
                Get Lifetime Access Now
              </button>
              <p className="text-center text-gray-500 mt-6">
                Secure payment processed by Stripe
              </p>
            </div>
          </div>

          {/* Agency License */}
          <div className="max-w-lg mx-auto bg-gray-900 rounded-lg shadow-xl overflow-hidden w-full">
            <div className="px-6 py-12">
              <h3 className="text-3xl font-semibold text-center mb-4 text-white">Agency License</h3>
              <div className="text-center mb-4">
                <div className="flex items-center justify-center">
                  <span className="text-5xl font-bold text-white">$499</span>
                  <div className="ml-2 text-left">
                    <span className="text-gray-400 block">one-time payment</span>
                    <span className="text-gray-400 line-through text-sm">Regular $999</span>
                  </div>
                </div>
              </div>
              <div className="bg-purple-900/30 rounded-lg p-4 mb-8 border border-purple-500/20">
                <p className="text-center font-medium text-purple-200 mb-1">
                  🏢 Agency Special - Save $500
                </p>
                <p className="text-center text-purple-200 text-sm">
                  Limited to first 20 agencies
                </p>
                <p className="text-center text-purple-200 text-sm">
                  Unlimited client usage
                </p>
              </div>
              <ul className="text-lg text-gray-300 mb-10 space-y-3">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Everything in Standard License
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited Client Projects
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  White Label Rights
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Custom Branding Allowed
                </li>
              </ul>
              <button
                onClick={() => handlePurchase('agency')}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-bold hover:opacity-90 transition duration-300"
              >
                Get Agency License
              </button>
              <p className="text-center text-gray-500 mt-6">
                Secure payment processed by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;










