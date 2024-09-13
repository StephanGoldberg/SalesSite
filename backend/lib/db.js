const fs = require('fs').promises;
const path = require('path');

const DB_FILE = path.join('/tmp', 'pendingAccess.json');

let pendingAccess = {};
let lastSave = Date.now();

const saveToFile = async () => {
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(pendingAccess));
    console.log('Database saved to file');
    lastSave = Date.now();
  } catch (error) {
    console.error('Error saving database to file:', error);
  }
};

const loadFromFile = async () => {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    pendingAccess = JSON.parse(data);
    console.log('Database loaded from file');
  } catch (error) {
    console.log('No existing database found, starting fresh');
  }
};

// Load data from file on module initialization
loadFromFile();

const setPendingAccess = async (token, data) => {
  console.log('Setting pending access:', token, JSON.stringify(data));
  pendingAccess[token] = { ...data, timestamp: Date.now() };
  if (Date.now() - lastSave > 60000) { // Save every minute
    await saveToFile();
  }
};

const getPendingAccess = (token) => {
  console.log('Getting pending access for token:', token);
  return pendingAccess[token];
};

const updatePendingAccess = async (token, data) => {
  console.log('Updating pending access:', token, JSON.stringify(data));
  if (pendingAccess[token]) {
    pendingAccess[token] = { ...pendingAccess[token], ...data, timestamp: Date.now() };
    if (Date.now() - lastSave > 60000) { // Save every minute
      await saveToFile();
    }
  }
};

const removePendingAccess = async (token) => {
  console.log('Removing pending access:', token);
  delete pendingAccess[token];
  if (Date.now() - lastSave > 60000) { // Save every minute
    await saveToFile();
  }
};

const getAllPendingAccess = () => {
  return pendingAccess;
};

const cleanupPendingAccess = async () => {
  console.log('Starting cleanup of pending access');
  const now = Date.now();
  const cleanedPendingAccess = Object.fromEntries(
    Object.entries(pendingAccess).filter(([_, value]) => {
      // Keep entries less than 24 hours old
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
  cleanupPendingAccess,
  loadFromFile // Export this for manual reloading if needed
};
