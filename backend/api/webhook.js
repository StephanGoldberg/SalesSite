const Stripe = require('stripe');
const { buffer } = require('micro');
const { updatePendingAccess, getAllPendingAccess } = require('../lib/db.js');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  console.log('Received webhook. Signature:', sig);

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    console.error('Received payload:', buf.toString());
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('Webhook verified. Event type:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Checkout session completed:', session.id);

    try {
      const pendingAccessEntries = await getAllPendingAccess();
      console.log('Pending access entries:', pendingAccessEntries);

      let tokenFound = false;
      for (let [token, data] of Object.entries(pendingAccessEntries)) {
        if (data.sessionId === session.id) {
          await updatePendingAccess(token, { ...data, paid: true });
          console.log('Updated pending access for token:', token);
          tokenFound = true;
          break;
        }
      }

      if (!tokenFound) {
        console.error('No matching token found for session:', session.id);
      }
    } catch (error) {
      console.error('Error updating pending access:', error);
      return res.status(500).send('Error processing webhook');
    }
  }

  res.json({ received: true });
};