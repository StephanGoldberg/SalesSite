// api/cleanup.js
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const DB_FILE = path.join('/tmp', 'pendingAccess.json');
  
  try {
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    const now = Date.now();
    const cleaned = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => {
        // Keep entries less than 24 hours old
        return now - value.timestamp < 24 * 60 * 60 * 1000;
      })
    );
    fs.writeFileSync(DB_FILE, JSON.stringify(cleaned));
    res.status(200).json({ message: 'Cleanup successful' });
  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({ error: 'Cleanup failed' });
  }
};