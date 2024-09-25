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
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Exclusive Offer</h2>
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-12">
            <h3 className="text-3xl font-semibold text-center mb-4">Lifetime Access</h3>
            <div className="text-center mb-6">
              <span className="text-5xl font-bold">$79</span>
              <span className="text-gray-600 ml-2">one-time payment</span>
            </div>
            <p className="text-center text-red-600 font-semibold mb-8">
              Limited offer: Only for the first 100 customers!
            </p>
            <ul className="text-lg text-gray-600 mb-10">
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
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Premium email support
              </li>
            </ul>
            <button
              onClick={handlePurchase}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-blue-700 transition duration-300"
            >
              Get Lifetime Access Now
            </button>
            <p className="text-center text-gray-500 mt-6">
              Secure payment processed by Stripe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;





