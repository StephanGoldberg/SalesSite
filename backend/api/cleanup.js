const cors = require('cors');
const { cleanupPendingAccess } = require('../lib/db');

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const corsMiddleware = cors(corsOptions);

const cleanup = async (req, res) => {
  try {
    await cleanupPendingAccess();
    res.status(200).json({ message: 'Cleanup successful' });
  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({ error: 'Cleanup failed' });
  }
};

module.exports = (req, res) => {
  if (req.method === 'OPTIONS') {
    return corsMiddleware(req, res, () => {
      res.status(200).end();
    });
  }
  return corsMiddleware(req, res, () => {
    cleanup(req, res);
  });
};