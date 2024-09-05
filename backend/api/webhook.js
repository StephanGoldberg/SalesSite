const Stripe = require('stripe');
const dotenv = require('dotenv');
const { getPendingAccess, updatePendingAccess } = require('../lib/db.js');

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
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
    console.log('Checkout session completed:', session.id);

    const pendingAccessEntries = await getPendingAccess();
    console.log('Pending access entries:', pendingAccessEntries);

    for (let [token, data] of Object.entries(pendingAccessEntries)) {
      if (data.sessionId === session.id) {
        await updatePendingAccess(token, { ...data, paid: true });
        console.log('Updated pending access for token:', token);
        break;
      }
    }
  }

  res.json({ received: true });
};
