require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const uuid = require('uuid');
const { setPendingAccess } = require('../lib/db');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://your-frontend-domain.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'POST') {
    try {
      const accessToken = uuid.v4();
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Directory Maker Boilerplate',
              },
              unit_amount: 7900, // $79.00
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/access?token=${accessToken}`,
        cancel_url: `${process.env.FRONTEND_URL}`,
      });

      await setPendingAccess(accessToken, { paid: false, sessionId: session.id });
      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: 'Failed to create checkout session' });
    }
  } else if (req.method === 'OPTIONS') {
    // Handle preflight request
    res.status(200).end();
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
