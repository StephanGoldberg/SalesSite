const Stripe = require('stripe');
const { v4: uuidv4 } = require('uuid');

// Initialize Stripe with the secret key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Logging function
const log = (message, data) => {
  console.log(`[${new Date().toISOString()}] ${message}`, data ? JSON.stringify(data) : '');
};

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://www.directory-maker.com',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true'
};

// Main handler function
module.exports = async (req, res) => {
  // Set CORS headers for all responses
  Object.keys(corsHeaders).forEach(key => {
    res.setHeader(key, corsHeaders[key]);
  });

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Log the incoming request
  log('Request received:', { method: req.method, url: req.url, headers: req.headers });

  // Only allow POST requests
  if (req.method !== 'POST') {
    log('Method not allowed:', req.method);
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    // Generate a unique access token
    const accessToken = uuidv4();
    log('Generated access token:', accessToken);

    // Create a Stripe checkout session
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

    // Here you would typically save the accessToken and session.id to your database
    // For example: await saveToDatabase(accessToken, session.id);

    // Send the session ID back to the client
    res.status(200).json({ id: session.id });
  } catch (error) {
    log('Error creating checkout session:', error);
    res.status(500).json({ 
      error: 'Failed to create checkout session', 
      details: error.message 
    });
  }
};

// Log environment variables (be careful not to log sensitive information)
log('Environment variables:', {
  FRONTEND_URL: process.env.FRONTEND_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? 'Set' : 'Not set'
});