import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function HeroSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backendUrl, setBackendUrl] = useState('');

  useEffect(() => {
    setBackendUrl(process.env.REACT_APP_BACKEND_URL);
    console.log('Primary Backend URL:', process.env.REACT_APP_BACKEND_URL);
    console.log('Fallback URL 1:', process.env.REACT_APP_FALLBACK_URL_1);
    console.log('Fallback URL 2:', process.env.REACT_APP_FALLBACK_URL_2);
  }, []);

  const tryCheckout = async (url) => {
    try {
      const response = await axios.post(
        `${url}/create-checkout-session`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Checkout failed for URL ${url}:`, error);
      throw error;
    }
  };

  const handlePurchase = async () => {
    setIsLoading(true);
    setError(null);

    const urls = [
      backendUrl,
      process.env.REACT_APP_FALLBACK_URL_1,
      process.env.REACT_APP_FALLBACK_URL_2
    ].filter(Boolean);

    for (const url of urls) {
      try {
        console.log(`Attempting checkout with URL: ${url}`);
        const data = await tryCheckout(url);
        console.log('Checkout successful:', data);

        const stripe = await stripePromise;
        if (!stripe) {
          throw new Error('Stripe failed to load');
        }

        const { error: stripeError } = await stripe.redirectToCheckout({
          sessionId: data.id,
        });

        if (stripeError) {
          console.error('Stripe redirect error:', stripeError);
          setError(stripeError.message);
        }

        return; // Exit the loop if successful
      } catch (error) {
        console.error(`Checkout failed for ${url}:`, error);
        // Continue to next URL if available
      }
    }

    // If all URLs fail
    setError('Failed to initiate checkout. Please try again later.');
    setIsLoading(false);
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
        <div className="mt-4 text-white">
          <p>Primary Backend URL: {backendUrl}</p>
          <p>Stripe Publishable Key: {process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ? 'Set' : 'Not Set'}</p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
























