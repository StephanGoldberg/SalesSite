const Stripe = require('stripe');
const { v4: uuidv4 } = require('uuid');
const { setPendingAccess } = require('../lib/db.js');

// Initialize Stripe
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Logging function
const log = (message, data) => {
  console.log(`[${new Date().toISOString()}] ${message}`, data ? JSON.stringify(data) : '');
};

// CORS middleware
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', 'https://www.directory-maker.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

// Create checkout session function
const createCheckoutSession = async (req, res) => {
  log('Creating checkout session');
  try {
    const accessToken = uuidv4();
    log('Generated access token:', accessToken);

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

    log('Checkout session created:', session.id);
    await setPendingAccess(accessToken, { paid: false, sessionId: session.id });
    log('Pending access set for token:', accessToken);

    res.status(200).json({ id: session.id });
  } catch (error) {
    log('Error creating checkout session:', error);
    res.status(500).json({ 
      error: 'Failed to create checkout session', 
      details: error.message 
    });
  }
};

// Main handler for Vercel serverless function
const handler = (req, res) => {
  log('Request received:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.method === 'POST' ? req.body : undefined
  });

  if (req.method === 'POST') {
    return createCheckoutSession(req, res);
  } else {
    log('Method not allowed:', req.method);
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(405).end('Method Not Allowed');
  }
};

// Wrap the handler with the CORS middleware
module.exports = allowCors(handler);

// Log environment variables (be careful not to log sensitive information)
log('Environment variables:', {
  FRONTEND_URL: process.env.FRONTEND_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? 'Set' : 'Not set',
  GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN ? 'Set' : 'Not set',
  GITHUB_REPO_OWNER: process.env.GITHUB_REPO_OWNER,
  GITHUB_REPO_NAME: process.env.GITHUB_REPO_NAME,
});