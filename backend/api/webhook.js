const Stripe = require('stripe');
const { updatePendingAccess, getPendingAccess } = require('../lib/db.js');
const { buffer } = require('micro');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    let event;
    try {
      const buf = await buffer(req);
      const sig = req.headers['stripe-signature'];
      event = stripe.webhooks.constructEvent(buf.toString(), sig, endpointSecret);
    } catch (err) {
      console.error('Webhook Error:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log('Received webhook event:', event.type);

    try {
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object;
          console.log('Checkout session completed:', session.id);

          const url = new URL(session.success_url);
          const token = url.searchParams.get('token');

          if (token) {
            const pendingAccess = await getPendingAccess(token);
            console.log('Current pending access:', pendingAccess);
            
            await updatePendingAccess(token, { paid: true });
            console.log('Updated pending access for token:', token);
            
            const updatedPendingAccess = await getPendingAccess(token);
            console.log('Updated pending access:', updatedPendingAccess);
          } else {
            console.log('No token found in success_url');
          }
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.json({received: true});
    } catch (err) {
      console.error('Error processing webhook:', err);
      res.status(500).send(`Webhook Error: ${err.message}`);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};
