const cors = require('cors');
const { cleanupPendingAccess, getAllPendingAccess } = require('../lib/db');

const corsMiddleware = cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

module.exports = async (req, res) => {
  await new Promise((resolve) => corsMiddleware(req, res, resolve));

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      console.log('Cleanup process started');
      const beforeCleanup = await getAllPendingAccess();
      console.log('Pending access before cleanup:', JSON.stringify(beforeCleanup));
      
      await cleanupPendingAccess();
      
      const afterCleanup = await getAllPendingAccess();
      console.log('Pending access after cleanup:', JSON.stringify(afterCleanup));
      
      res.status(200).json({ message: 'Cleanup successful', before: beforeCleanup, after: afterCleanup });
    } catch (error) {
      console.error('Cleanup error:', error);
      res.status(500).json({ error: 'Cleanup failed', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};