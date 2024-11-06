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
    <section className="hero">
      <div className="container text-center">
        <h1 className="text-4xl font-medium mb-4">Unlock Lifetime Access to</h1>
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 font-extrabold mb-4">
          DirectoryMaker
        </h2>
        <p className="text-xl text-gray-300 mb-8">Make a one-time payment for unlimited access</p>
        <button
          onClick={handlePurchase}
          disabled={isLoading}
          className={`py-3 px-8 rounded-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Processing...' : 'Buy Now - $79'}
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </section>
  );
}

export default HeroSection;















