const fs = require('fs').promises;
const path = require('path');

const DB_FILE = path.join('/tmp', 'pendingAccess.json');

const saveToFile = async (data) => {
  await fs.writeFile(DB_FILE, JSON.stringify(data));
};

const loadFromFile = async () => {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log('No existing database found, starting fresh');
    return {};
  }
};

const setPendingAccess = async (token, data) => {
  console.log('Setting pending access:', token, data);
  const pendingAccess = await loadFromFile();
  pendingAccess[token] = { ...data, timestamp: Date.now() };
  await saveToFile(pendingAccess);
};

const getPendingAccess = async (token) => {
  console.log('Getting pending access for token:', token);
  const pendingAccess = await loadFromFile();
  return pendingAccess[token];
};

const updatePendingAccess = async (token, data) => {
  console.log('Updating pending access:', token, data);
  const pendingAccess = await loadFromFile();
  pendingAccess[token] = { ...pendingAccess[token], ...data, timestamp: Date.now() };
  await saveToFile(pendingAccess);
};

const removePendingAccess = async (token) => {
  console.log('Removing pending access:', token);
  const pendingAccess = await loadFromFile();
  delete pendingAccess[token];
  await saveToFile(pendingAccess);
};

const getAllPendingAccess = async () => {
  return await loadFromFile();
};

const cleanupPendingAccess = async () => {
  console.log('Starting cleanup of pending access');
  const pendingAccess = await loadFromFile();
  const now = Date.now();
  const cleanedPendingAccess = Object.fromEntries(
    Object.entries(pendingAccess).filter(([_, value]) => {
      // Keep entries less than 24 hours old
      return now - value.timestamp < 24 * 60 * 60 * 1000;
    })
  );
  await saveToFile(cleanedPendingAccess);
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
