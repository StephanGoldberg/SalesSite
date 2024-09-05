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
    <section className="pricing-section">
      {/* Add your pricing section content here */}
      <button onClick={handlePurchase} className="purchase-button">
        Buy Now - $79
      </button>
    </section>
  );
}

export default PricingSection;





