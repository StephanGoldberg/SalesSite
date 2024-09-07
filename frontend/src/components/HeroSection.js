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
    console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);
  }, []);

  const handlePurchase = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Initiating purchase...');
      console.log('Using backend URL:', `${backendUrl}/create-checkout-session`);
      
      const response = await axios.post(
        `${backendUrl}/create-checkout-session`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response received:', response.data);

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (stripeError) {
        console.error('Stripe redirect error:', stripeError);
        setError(stripeError.message);
      }
    } catch (error) {
      console.error('Error initiating checkout:', error);
      
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        setError(`Server error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError(`No response from server. URL attempted: ${backendUrl}/create-checkout-session`);
      } else {
        console.error('Error setting up request:', error.message);
        setError(`Error: ${error.message}`);
      }
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
        <div className="mt-4 text-white">
          <p>Backend URL: {backendUrl}</p>
          <p>Stripe Publishable Key: {process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ? 'Set' : 'Not Set'}</p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
























