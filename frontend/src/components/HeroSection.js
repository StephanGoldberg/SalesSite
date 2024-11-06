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
    <section className="w-screen bg-black pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(128,90,213,0.3),transparent_80%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.25),transparent_100%)]" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-medium mb-4 text-white">
          Unlock Lifetime Access to
        </h1>
        <h2 
          className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 font-extrabold mb-4"
          style={{
            fontSize: 'clamp(2rem, 5vw, 6rem)', 
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          DirectoryMaker
        </h2>
        <p className="text-xl sm:text-2xl text-gray-300 mb-8">
          Make a one-time payment for unlimited access
        </p>
        <button
          onClick={handlePurchase}
          disabled={isLoading}
          className="bg-white text-blue-700 py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300"
          style={{ opacity: isLoading ? 0.5 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
        >
          {isLoading ? 'Processing...' : 'Buy Now - $79'}
        </button>
        {error && (
          <p className="mt-4 text-red-500 bg-red-900/50 p-2 rounded">
            Error: {error}
          </p>
        )}
      </div>
    </section>
  );
}

export default HeroSection;















