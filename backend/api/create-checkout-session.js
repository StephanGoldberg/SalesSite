const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const path = require('path');
const { setPendingAccess, getPendingAccess, updatePendingAccess, removePendingAccess } = require('../lib/db.js');
const { addUserToGitHubRepo } = require('../lib/addUserToGitHubRepo.js');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('PORT:', process.env.PORT);
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'Set' : 'Not set');
console.log('GITHUB_ACCESS_TOKEN:', process.env.GITHUB_ACCESS_TOKEN ? 'Set' : 'Not set');
console.log('GITHUB_REPO_OWNER:', process.env.GITHUB_REPO_OWNER);
console.log('GITHUB_REPO_NAME:', process.env.GITHUB_REPO_NAME);

const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,
    'https://checkout.stripe.com',
    'https://www.directory-maker.com',
    'https://directory-maker.com',
    'https://sales-site02-29p3hum58-stephangoldbergs-projects.vercel.app'
  ],
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

const createCheckoutSession = async (req, res) => {
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
};

// ... (rest of your functions: submitGithubUsername, handleWebhook, checkPaymentStatus)

// Export for Vercel serverless function
module.exports = async (req, res) => {
  if (req.method === 'POST') {
    await createCheckoutSession(req, res);
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};












