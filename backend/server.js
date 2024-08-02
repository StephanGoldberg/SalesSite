require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Octokit } = require('@octokit/rest');
const cors = require('cors');
const uuid = require('uuid');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN
});

// Store for pending access requests
const pendingAccess = new Map();

// Create a Stripe Checkout session
app.post('/create-checkout-session', async (req, res) => {
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

    pendingAccess.set(accessToken, { paid: false, sessionId: session.id });
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Handle successful payment webhook
app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    for (let [token, data] of pendingAccess.entries()) {
      if (data.sessionId === session.id) {
        pendingAccess.set(token, { ...data, paid: true });
        break;
      }
    }
  }

  res.json({received: true});
});

// Handle GitHub username submission
app.post('/submit-github-username', async (req, res) => {
  const { token, githubUsername } = req.body;

  if (!pendingAccess.has(token) || !pendingAccess.get(token).paid) {
    return res.status(403).json({ error: 'Invalid or unpaid access token' });
  }

  try {
    await addUserToGitHubRepo(githubUsername);
    pendingAccess.delete(token);
    res.json({ success: true, message: 'Access granted to GitHub repository' });
  } catch (error) {
    console.error('Error granting GitHub access:', error);
    res.status(500).json({ error: 'Failed to grant GitHub access' });
  }
});

async function addUserToGitHubRepo(username) {
  try {
    await octokit.repos.addCollaborator({
      owner: process.env.GITHUB_REPO_OWNER,
      repo: process.env.GITHUB_REPO_NAME,
      username: username,
      permission: 'pull'
    });
    console.log(`Successfully added ${username} to the repository`);
  } catch (error) {
    console.error('Error adding user to GitHub repo:', error);
    throw error;
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
