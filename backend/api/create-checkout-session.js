const cors = require('cors');
const Stripe = require('stripe');
const { v4: uuidv4 } = require('uuid');
const { setPendingAccess } = require('../lib/db.js');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const corsMiddleware = cors({
  origin: process.env.FRONTEND_URL,
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

module.exports = async (req, res) => {
  await new Promise((resolve) => corsMiddleware(req, res, resolve));

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    console.log('Received request for checkout session');
    try {
      const accessToken = uuidv4();
      console.log('Generated access token:', accessToken);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'GitHub Repository Access',
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

      console.log('Checkout session created:', session.id);
      await setPendingAccess(accessToken, { paid: false, sessionId: session.id });
      console.log('Pending access set for token:', accessToken);

      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ 
        error: 'Failed to create checkout session', 
        details: error.message 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
