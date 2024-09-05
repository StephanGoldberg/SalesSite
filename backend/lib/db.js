const fs = require('fs').promises;
const path = require('path');

const DB_FILE = path.join('/tmp', 'pendingAccess.json');

let pendingAccess = {};

// Logging function
const log = (message, data) => {
  console.log(`[${new Date().toISOString()}] ${message}`, data ? JSON.stringify(data) : '');
};

// Helper function to save data to file
const saveToFile = async () => {
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(pendingAccess));
    log('Data saved to file');
  } catch (error) {
    log('Error saving to file:', error.message);
  }
};

// Load data from file
const loadFromFile = async () => {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    pendingAccess = JSON.parse(data);
    log('Data loaded from file');
  } catch (error) {
    if (error.code === 'ENOENT') {
      log('No existing database found, starting fresh');
    } else {
      log('Error loading from file:', error.message);
    }
  }
};

// Initialize the database
loadFromFile();

const setPendingAccess = async (token, data) => {
  log('Setting pending access:', { token, data });
  pendingAccess[token] = { ...data, timestamp: Date.now() };
  await saveToFile();
};

const getPendingAccess = (token) => {
  log('Getting pending access for token:', token);
  return pendingAccess[token];
};

const updatePendingAccess = async (token, data) => {
  log('Updating pending access:', { token, data });
  if (pendingAccess[token]) {
    pendingAccess[token] = { ...pendingAccess[token], ...data, timestamp: Date.now() };
    await saveToFile();
  } else {
    log('Warning: Attempted to update non-existent token:', token);
  }
};

const removePendingAccess = async (token) => {
  log('Removing pending access:', token);
  if (pendingAccess[token]) {
    delete pendingAccess[token];
    await saveToFile();
  } else {
    log('Warning: Attempted to remove non-existent token:', token);
  }
};

const getAllPendingAccess = () => {
  return pendingAccess;
};

const cleanupPendingAccess = async () => {
  log('Starting cleanup of pending access');
  const now = Date.now();
  const initialCount = Object.keys(pendingAccess).length;
  pendingAccess = Object.fromEntries(
    Object.entries(pendingAccess).filter(([_, value]) => {
      // Keep entries less than 24 hours old
      return now - value.timestamp < 24 * 60 * 60 * 1000;
    })
  );
  const finalCount = Object.keys(pendingAccess).length;
  await saveToFile();
  log(`Cleanup completed. Removed ${initialCount - finalCount} entries.`);
};

module.exports = {
  setPendingAccess,
  getPendingAccess,
  updatePendingAccess,
  removePendingAccess,
  getAllPendingAccess,
  cleanupPendingAccess
};
