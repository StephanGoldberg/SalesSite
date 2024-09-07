import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function HeroSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePurchase = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/create-checkout-session');
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: response.data.id });
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to initiate checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4 text-white">
          Get Access to Our Exclusive GitHub Repository
        </h1>
        <p className="text-xl text-blue-100 mb-8">
          One-time payment for lifetime access
        </p>
        <button
          onClick={handlePurchase}
          disabled={isLoading}
          className={`bg-white text-blue-600 py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Processing...' : 'Buy Now - $79'}
        </button>
        {error && (
          <p className="mt-4 text-red-200 bg-red-600 p-2 rounded">
            Error: {error}
          </p>
        )}
      </div>
    </section>
  );
}

export default HeroSection;
























