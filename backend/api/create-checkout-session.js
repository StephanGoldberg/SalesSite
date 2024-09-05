const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const path = require('path');
const { setPendingAccess, getPendingAccess, updatePendingAccess, removePendingAccess } = require('../lib/db.js');
const { addUserToGitHubRepo } = require('../lib/addUserToGitHubRepo.js');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('PORT:', process.env.PORT);
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'Set' : 'Not set');
console.log('GITHUB_ACCESS_TOKEN:', process.env.GITHUB_ACCESS_TOKEN ? 'Set' : 'Not set');
console.log('GITHUB_REPO_OWNER:', process.env.GITHUB_REPO_OWNER);
console.log('GITHUB_REPO_NAME:', process.env.GITHUB_REPO_NAME);

const corsOptions = {
  origin: [process.env.FRONTEND_URL, 'https://checkout.stripe.com'],
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
  credentials: true,
};

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

const submitGithubUsername = async (req, res) => {
  console.log('Received request to submit GitHub username');
  console.log('Request body:', req.body);
  const { token, githubUsername } = req.body;

  try {
    const pendingAccess = getPendingAccess(token);
    console.log('Pending access:', pendingAccess);
    if (!pendingAccess || !pendingAccess.paid) {
      console.log('Invalid or unpaid access token:', token);
      return res.status(403).json({ error: 'Invalid or unpaid access token' });
    }

    console.log('Adding user to GitHub repo:', githubUsername);
    await addUserToGitHubRepo(githubUsername);
    await removePendingAccess(token);
    
    console.log('Access granted to GitHub repository for:', githubUsername);
    res.status(200).json({ success: true, message: 'Access granted to GitHub repository' });
  } catch (error) {
    console.error('Error granting GitHub access:', error);
    res.status(500).json({ error: 'Failed to grant GitHub access', details: error.message });
  }
};

const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
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
};

const checkPaymentStatus = async (req, res) => {
  const { token } = req.params;
  console.log('Checking payment status for token:', token);
  const pendingAccess = getPendingAccess(token);
  console.log('Pending access for token:', pendingAccess);
  if (pendingAccess) {
    console.log('Pending access found:', pendingAccess);
    res.json({ paid: pendingAccess.paid });
  } else {
    console.log('No pending access found for token:', token);
    res.status(404).json({ error: 'Token not found' });
  }
};

module.exports = {
  createCheckoutSession,
  submitGithubUsername,
  handleWebhook,
  checkPaymentStatus
};












