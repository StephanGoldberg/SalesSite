const fs = require('fs').promises;
const path = require('path');

const DB_FILE = path.join('/tmp', 'pendingAccess.json');

let pendingAccess = {};
let lastSaveTime = 0;

const loadFromFile = async () => {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    pendingAccess = JSON.parse(data);
    console.log('Database loaded from file');
  } catch (error) {
    console.log('No existing database found, starting fresh');
    pendingAccess = {};
  }
};

const saveToFile = async () => {
  const now = Date.now();
  if (now - lastSaveTime > 60000) { // Save at most once per minute
    try {
      await fs.writeFile(DB_FILE, JSON.stringify(pendingAccess));
      lastSaveTime = now;
      console.log('Database saved to file');
    } catch (error) {
      console.error('Error saving database:', error);
    }
  }
};

// Load data from file on module initialization
loadFromFile();

const setPendingAccess = async (token, data) => {
  console.log('Setting pending access:', token, JSON.stringify(data));
  pendingAccess[token] = { ...data, timestamp: Date.now() };
  await saveToFile();
};

const getPendingAccess = async (token) => {
  console.log('Getting pending access for token:', token);
  await loadFromFile(); // Reload data before each read
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
  await loadFromFile(); // Reload data before returning all entries
  return pendingAccess;
};

const cleanupPendingAccess = async () => {
  console.log('Starting cleanup of pending access');
  await loadFromFile(); // Reload data before cleanup
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
