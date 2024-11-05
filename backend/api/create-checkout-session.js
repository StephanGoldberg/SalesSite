const Stripe = require('stripe');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const path = require('path');
const crypto = require('crypto');
const { setPendingAccess, getAllPendingAccess } = require('../lib/db.js');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Generate a secure state parameter
const generateStateParam = () => {
  return crypto.randomBytes(16).toString('hex');
};

module.exports = async (req, res) => {
  console.log('Create checkout session endpoint hit');

  if (req.method === 'POST') {
    try {
      const stateParam = generateStateParam();
      const accessToken = uuidv4(); // Keep generating this for compatibility
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
              unit_amount: 7900,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        // Include both old token and new secure parameters
        success_url: `${process.env.FRONTEND_URL}/access?token=${accessToken}&session_id={CHECKOUT_SESSION_ID}&state=${stateParam}`,
        cancel_url: `${process.env.FRONTEND_URL}`,
      });

      console.log('Checkout session created:', session.id);
      
      // Store both old and new verification data
      await setPendingAccess(accessToken, {
        paid: false,
        sessionId: session.id,
        state: stateParam,
        createdAt: Date.now()
      });

      console.log('Pending access set for token:', accessToken);

      const allPendingAccess = await getAllPendingAccess();
      console.log('All pending access after setting:', JSON.stringify(allPendingAccess));

      res.status(200).json({ id: session.id, token: accessToken });
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