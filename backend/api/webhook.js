const Stripe = require('stripe');
const { updatePendingAccess, getAllPendingAccess } = require('../lib/db.js');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('Received webhook event:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Checkout session completed:', session.id);

    try {
      const pendingAccessEntries = await getAllPendingAccess();
      console.log('Pending access entries:', pendingAccessEntries);

      for (let [token, data] of Object.entries(pendingAccessEntries)) {
        if (data.sessionId === session.id) {
          await updatePendingAccess(token, { ...data, paid: true });
          console.log('Updated pending access for token:', token);
          break;
        }
      }
    } catch (error) {
      console.error('Error updating pending access:', error);
      return res.status(500).send('Error processing webhook');
    }
  }

  res.json({ received: true });
};