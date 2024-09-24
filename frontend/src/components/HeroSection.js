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
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/create-checkout-session`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (stripeError) {
        setError(stripeError.message);
      }
    } catch (error) {
      if (error.response) {
        setError(`Server error: ${error.response.status}`);
      } else if (error.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-black via-black to-purple-900 py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4 text-white">
          Unlock Lifetime Access to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-7xl font-extrabold drop-shadow-lg">
            DirectoryMaker
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Make a one-time payment for unlimited access
        </p>
        <button
          onClick={handlePurchase}
          disabled={isLoading}
          className={`bg-white text-blue-700 py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 ${
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








