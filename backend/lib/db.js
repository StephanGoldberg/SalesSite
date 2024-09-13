const fs = require('fs').promises;
const path = require('path');

const DB_FILE = path.join('/tmp', 'pendingAccess.json');

const getPendingAccessData = async () => {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    console.log('Raw pending access data:', data);
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('No existing database found, starting fresh');
      return {};
    }
    console.error('Error reading database:', error);
    throw error;
  }
};

const setPendingAccessData = async (data) => {
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
    console.log('Database saved successfully');
  } catch (error) {
    console.error('Error saving database:', error);
    throw error;
  }
};

const setPendingAccess = async (token, data) => {
  console.log('Setting pending access:', token, JSON.stringify(data));
  const pendingAccess = await getPendingAccessData();
  pendingAccess[token] = { ...data, timestamp: Date.now() };
  await setPendingAccessData(pendingAccess);
  console.log('Pending access set for token:', token);
};

const getPendingAccess = async (token) => {
  console.log('Getting pending access for token:', token);
  const pendingAccess = await getPendingAccessData();
  return pendingAccess[token];
};

const updatePendingAccess = async (token, data) => {
  console.log('Updating pending access:', token, JSON.stringify(data));
  const pendingAccess = await getPendingAccessData();
  if (pendingAccess[token]) {
    pendingAccess[token] = { ...pendingAccess[token], ...data, timestamp: Date.now() };
    await setPendingAccessData(pendingAccess);
    console.log('Pending access updated for token:', token);
  } else {
    console.log('Token not found for update:', token);
  }
};

const removePendingAccess = async (token) => {
  console.log('Removing pending access:', token);
  const pendingAccess = await getPendingAccessData();
  delete pendingAccess[token];
  await setPendingAccessData(pendingAccess);
  console.log('Pending access removed for token:', token);
};

const getAllPendingAccess = async () => {
  return await getPendingAccessData();
};

const cleanupPendingAccess = async () => {
  console.log('Starting cleanup of pending access');
  const pendingAccess = await getPendingAccessData();
  const now = Date.now();
  const cleanedPendingAccess = Object.fromEntries(
    Object.entries(pendingAccess).filter(([_, value]) => {
      return now - value.timestamp < 24 * 60 * 60 * 1000;
    })
  );
  await setPendingAccessData(cleanedPendingAccess);
  console.log('Cleanup completed');
};

module.exports = {
  setPendingAccess,
  getPendingAccess,
  updatePendingAccess,
  removePendingAccess,
  getAllPendingAccess,
  cleanupPendingAccess
};
