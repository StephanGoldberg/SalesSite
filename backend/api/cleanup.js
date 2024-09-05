const { cleanupPendingAccess } = require('../lib/db');

module.exports = async (req, res) => {
  try {
    await cleanupPendingAccess();
    res.status(200).json({ message: 'Cleanup successful' });
  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({ error: 'Cleanup failed' });
  }
};