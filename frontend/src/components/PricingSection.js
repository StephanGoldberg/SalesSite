import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function PricingSection() {
  const handlePurchase = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/create-checkout-session`,
        {},
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
    <section id="pricing" className="w-full py-20 bg-gradient-to-r from-black via-purple-900 to-indigo-600">
      <div className="w-full px-4 text-center">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Exclusive Offer</h2>
        <div className="max-w-lg mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-12">
            <h3 className="text-3xl font-semibold text-center text-white mb-4">Lifetime Access</h3>
            <div className="text-center mb-6">
              <span className="text-5xl font-bold text-white">$79</span>
              <span className="text-gray-400 ml-2">one-time payment</span>
            </div>
            <p className="text-center text-red-400 font-semibold mb-8">
              Limited offer: Only for the first 100 customers!
            </p>
            <ul className="text-lg text-gray-300 mb-10">
              <li className="mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Full access to Directory Maker
              </li>
              <li className="mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Lifetime updates included
              </li>
              <li className="mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Private GitHub repository access
              </li>
              <li className="mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Access to future premium features
              </li>
            </ul>
            <button
              onClick={handlePurchase}
              className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-blue-700 transition duration-300"
            >
              Get Lifetime Access Now
            </button>
            <p className="text-center text-gray-400 mt-6">
              Secure payment processed by Stripe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;







