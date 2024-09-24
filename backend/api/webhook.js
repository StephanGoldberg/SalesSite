const Stripe = require('stripe');
const { buffer } = require('micro');
const { updatePendingAccess, getAllPendingAccess, setPendingAccess } = require('../lib/db.js');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

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
          console.log('No matching token found for session:', session.id);
          const successUrl = new URL(session.success_url);
          const token = successUrl.searchParams.get('token');
          if (token) {
            await setPendingAccess(token, { sessionId: session.id, paid: true });
            console.log('Created new pending access for token:', token);
          } else {
            console.error('Unable to extract token from success_url');
          }
        }
      } catch (error) {
        console.error('Error updating pending access:', error);
        return res.status(500).send('Error processing webhook');
      }
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};