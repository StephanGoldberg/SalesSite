const Stripe = require('stripe');
const { updatePendingAccess } = require('../lib/db.js');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

module.exports = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('Received webhook event:', event.type);

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Checkout session completed:', session.id);

      // Extract the token from the success_url
      const url = new URL(session.success_url);
      const token = url.searchParams.get('token');

      if (token) {
        await updatePendingAccess(token, { paid: true });
        console.log('Updated pending access for token:', token);
      } else {
        console.log('No token found in success_url');
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({received: true});
};
