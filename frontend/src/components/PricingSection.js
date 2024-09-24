import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Load Stripe with your publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function PricingSection() {
  const handlePurchase = async () => {
    try {
      console.log('Initiating purchase...');

      // Make an API call with minimal data and a timeout
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/create-checkout-session`,
        {}, // Send minimal data
        {
          timeout: 10000, // 10 second timeout
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Session created:', response.data);
      const stripe = await stripePromise;

      // Redirect to the Stripe checkout
      await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
    } catch (error) {
      console.error('Error initiating checkout:', error);
      console.log('Error details:', error.response); // Detailed logging for debugging
      alert('Failed to initiate checkout. Please try again.');
    }
  };

  return (
    <section className="pricing-section py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h3 className="text-2xl font-semibold text-center mb-4">One-Time Purchase</h3>
            <p className="text-gray-600 text-center mb-6">Get lifetime access to Directory Maker</p>
            <div className="text-4xl font-bold text-center mb-6">$79</div>
            <ul className="text-sm text-gray-600 mb-6">
              <li className="mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Full access to Directory Maker
              </li>
              <li className="mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                GitHub repository access
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Future updates included
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;





