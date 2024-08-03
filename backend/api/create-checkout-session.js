require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const uuid = require('uuid');
const { setPendingAccess } = require('../lib/db');

module.exports = async (req, res) => {
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
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};