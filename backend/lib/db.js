const fs = require('fs').promises;
const path = require('path');

const DB_FILE = path.join('/tmp', 'pendingAccess.json');

const readDatabase = async () => {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {};
    }
    throw error;
  }
};

const writeDatabase = async (data) => {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
};

const setPendingAccess = async (token, data) => {
  console.log('Setting pending access:', token, JSON.stringify(data));
  const db = await readDatabase();
  db[token] = { ...data, timestamp: Date.now() };
  await writeDatabase(db);
  console.log('Pending access set for token:', token);
};

const getPendingAccess = async (token) => {
  console.log('Getting pending access for token:', token);
  const db = await readDatabase();
  const access = db[token];
  console.log('Retrieved pending access:', JSON.stringify(access));
  return access;
};

const updatePendingAccess = async (token, data) => {
  console.log('Updating pending access:', token, JSON.stringify(data));
  const db = await readDatabase();
  if (db[token]) {
    db[token] = { ...db[token], ...data, timestamp: Date.now() };
    await writeDatabase(db);
    console.log('Pending access updated for token:', token);
  } else {
    console.log('Token not found for update:', token);
  }
};

const removePendingAccess = async (token) => {
  console.log('Removing pending access:', token);
  const db = await readDatabase();
  delete db[token];
  await writeDatabase(db);
  console.log('Pending access removed for token:', token);
};

const getAllPendingAccess = async () => {
  console.log('Getting all pending access');
  const db = await readDatabase();
  return Object.values(db);
};

const cleanupPendingAccess = async () => {
  console.log('Starting cleanup of pending access');
  const db = await readDatabase();
  const now = Date.now();
  let cleaned = 0;
  for (const [token, data] of Object.entries(db)) {
    if (now - data.timestamp >= 24 * 60 * 60 * 1000) {
      delete db[token];
      cleaned++;
    }
  }
  await writeDatabase(db);
  console.log(`Cleanup completed. Removed ${cleaned} entries.`);
};

module.exports = {
  setPendingAccess,
  getPendingAccess,
  updatePendingAccess,
  removePendingAccess,
  getAllPendingAccess,
  cleanupPendingAccess
};
