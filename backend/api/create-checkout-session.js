const Stripe = require('stripe');
const cors = require('cors');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const corsOptions = {
  origin: ['https://www.directory-maker.com'],
};

const corsMiddleware = cors(corsOptions);

module.exports = async (req, res) => {
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Method not allowed' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price_data: { currency: 'usd', product_data: { name: 'Repo Access' }, unit_amount: 7900 }, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/access?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.FRONTEND_URL,
    });
    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: 'Error creating checkout session' });
  }
};
