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
    <section id="pricing" className="py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Exclusive Offer</h2>
        <div className="price-box">
          <div className="px-6 py-12">
            <h3 className="text-3xl font-semibold text-center mb-4">Lifetime Access</h3>
            <div className="text-center mb-6">
              <span className="text-5xl font-bold">$79</span>
              <span className="text-gray-600 ml-2">one-time payment</span>
            </div>
            <p className="text-center text-red-600 font-semibold mb-8">
              Limited offer: Only for the first 100 customers!
            </p>
            <ul className="text-lg text-gray-300 mb-10">
              <li className="mb-3">Full access to Directory Maker</li>
              <li className="mb-3">Lifetime updates included</li>
              <li className="mb-3">Private GitHub repository access</li>
              <li className="mb-3">Access to future premium features</li>
            </ul>
            <button
              onClick={handlePurchase}
              className="w-full py-3 px-4 rounded-lg font-bold transition duration-300"
            >
              Get Lifetime Access Now
            </button>
            <p className="text-center text-gray-500 mt-6">Secure payment processed by Stripe</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;








