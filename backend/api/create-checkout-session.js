const Stripe = require('stripe');
const { v4: uuidv4 } = require('uuid');
const { setPendingAccess } = require('../lib/db.js');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const log = (message, data) => {
  console.log(`[${new Date().toISOString()}] ${message}`, data ? JSON.stringify(data) : '');
};

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', 'https://www.directory-maker.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  log('Request received:', { method: req.method, url: req.url });

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const accessToken = uuidv4();
    log('Generated access token:', accessToken);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'GitHub Repository Access' },
            unit_amount: 7900,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/access?token=${accessToken}`,
      cancel_url: `${process.env.FRONTEND_URL}`,
    });

    log('Checkout session created:', session.id);
    await setPendingAccess(accessToken, { paid: false, sessionId: session.id });
    log('Pending access set for token:', accessToken);

    return res.status(200).json({ id: session.id });
  } catch (error) {
    log('Error creating checkout session:', error);
    return res.status(500).json({ error: 'Failed to create checkout session', details: error.message });
  }
};

log('Environment variables:', {
  FRONTEND_URL: process.env.FRONTEND_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? 'Set' : 'Not set',
  GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN ? 'Set' : 'Not set',
  GITHUB_REPO_OWNER: process.env.GITHUB_REPO_OWNER,
  GITHUB_REPO_NAME: process.env.GITHUB_REPO_NAME,
});