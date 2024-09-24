const fs = require('fs').promises;
const path = require('path');

const DB_FILE = path.join('/tmp', 'pendingAccess.json');

let pendingAccess = {};

// Helper function to save data to file
const saveToFile = async () => {
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(pendingAccess));
    console.log('Database saved to file:', JSON.stringify(pendingAccess));
  } catch (error) {
    console.error('Error saving database:', error);
  }
};

// Load data from file on module initialization
const loadFromFile = async () => {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    pendingAccess = JSON.parse(data);
    console.log('Database loaded from file:', pendingAccess);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('No existing database found, starting fresh');
    } else {
      console.error('Error reading database file:', error);
    }
  }
};

// Initialize the database
loadFromFile();

const setPendingAccess = async (token, data) => {
  console.log('Setting pending access:', token, data);
  pendingAccess[token] = { ...data, timestamp: Date.now() };
  await saveToFile();
};

const getPendingAccess = async (token) => {
  console.log('Getting pending access for token:', token);
  await loadFromFile(); // Reload from file before each read
  return pendingAccess[token];
};

const updatePendingAccess = async (token, data) => {
  console.log('Updating pending access:', token, data);
  await loadFromFile(); // Reload from file before update
  if (pendingAccess[token]) {
    pendingAccess[token] = { ...pendingAccess[token], ...data, timestamp: Date.now() };
    await saveToFile();
  } else {
    console.log('Token not found for update:', token);
  }
};

const removePendingAccess = async (token) => {
  console.log('Removing pending access:', token);
  await loadFromFile(); // Reload from file before removal
  delete pendingAccess[token];
  await saveToFile();
};

const getAllPendingAccess = async () => {
  await loadFromFile(); // Reload from file before returning all data
  return pendingAccess;
};

const cleanupPendingAccess = async () => {
  console.log('Starting cleanup of pending access');
  await loadFromFile(); // Reload from file before cleanup
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
  cleanupPendingAccess
};
