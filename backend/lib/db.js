const fs = require('fs').promises;
const path = require('path');

const DB_FILE = path.join('/tmp', 'pendingAccess.json');
let pendingAccess = {};
let lastWrite = Date.now();

const loadFromFile = async () => {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    console.log('Database loaded from file:', data);
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('No existing database found, starting fresh');
      return {};
    }
    console.error('Error reading database file:', error);
    return {};
  }
};

const saveToFile = async () => {
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(pendingAccess, null, 2));
    console.log('Database saved to file:', JSON.stringify(pendingAccess, null, 2));
    lastWrite = Date.now();
  } catch (error) {
    console.error('Error saving database:', error);
  }
};

const initializeDB = async () => {
  pendingAccess = await loadFromFile();
};

initializeDB();

const setPendingAccess = async (token, data) => {
  console.log('Setting pending access:', token, JSON.stringify(data));
  pendingAccess[token] = { ...data, timestamp: Date.now() };
  await saveToFile();
};

const getPendingAccess = async (token) => {
  console.log('Getting pending access for token:', token);
  if (Date.now() - lastWrite > 60000) { // Reload from file if last write was more than 1 minute ago
    pendingAccess = await loadFromFile();
  }
  return pendingAccess[token];
};

const updatePendingAccess = async (token, data) => {
  console.log('Updating pending access:', token, JSON.stringify(data));
  if (pendingAccess[token]) {
    pendingAccess[token] = { ...pendingAccess[token], ...data, timestamp: Date.now() };
    await saveToFile();
  } else {
    console.log('Token not found for update:', token);
  }
};

const removePendingAccess = async (token) => {
  console.log('Removing pending access:', token);
  delete pendingAccess[token];
  await saveToFile();
};

const getAllPendingAccess = async () => {
  if (Date.now() - lastWrite > 60000) { // Reload from file if last write was more than 1 minute ago
    pendingAccess = await loadFromFile();
  }
  return pendingAccess;
};

const cleanupPendingAccess = async () => {
  console.log('Starting cleanup of pending access');
  const now = Date.now();
  const cleanedPendingAccess = Object.fromEntries(
    Object.entries(pendingAccess).filter(([_, value]) => {
      return now - value.timestamp < 24 * 60 * 60 * 1000;
    })
  );
  pendingAccess = cleanedPendingAccess;
  await saveToFile();
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
