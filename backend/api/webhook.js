const cors = require('cors');
const Stripe = require('stripe');
const { getPendingAccess, updatePendingAccess } = require('../lib/db.js');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const corsMiddleware = cors({
  origin: 'https://dashboard.stripe.com',
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Stripe-Signature'],
});

module.exports = async (req, res) => {
  await new Promise((resolve) => corsMiddleware(req, res, resolve));

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook Error:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log('Received webhook event:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('Checkout session completed:', session.id);
      
      const token = new URL(session.success_url).searchParams.get('token');
      if (token) {
        const pendingAccess = getPendingAccess(token);
        if (pendingAccess) {
          await updatePendingAccess(token, { ...pendingAccess, paid: true });
          console.log('Updated pending access for token:', token);
        } else {
          console.log('No pending access found for token:', token);
        }
      } else {
        console.log('No token found in success_url');
      }
    }

    res.json({received: true});
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
