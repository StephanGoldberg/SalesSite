const fs = require('fs').promises;
const path = require('path');

const DB_FILE = path.join('/tmp', 'pendingAccess.json');

let pendingAccess = {};

const saveToFile = async () => {
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(pendingAccess));
    console.log('Database saved successfully');
  } catch (error) {
    console.error('Error saving database:', error);
  }
};

const loadFromFile = async () => {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    pendingAccess = JSON.parse(data);
    console.log('Database loaded successfully');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('No existing database found, starting fresh');
    } else {
      console.error('Error loading database:', error);
    }
  }
};

// Load data on module initialization
loadFromFile();

const setPendingAccess = async (token, data) => {
  console.log('Setting pending access:', token, JSON.stringify(data));
  pendingAccess[token] = { ...data, timestamp: Date.now() };
  await saveToFile();
  console.log('Current pendingAccess:', JSON.stringify(pendingAccess));
};

const getPendingAccess = (token) => {
  console.log('Getting pending access for token:', token);
  const access = pendingAccess[token];
  console.log('Retrieved pending access:', JSON.stringify(access));
  return access;
};

const updatePendingAccess = async (token, data) => {
  console.log('Updating pending access:', token, JSON.stringify(data));
  if (pendingAccess[token]) {
    pendingAccess[token] = { ...pendingAccess[token], ...data, timestamp: Date.now() };
    await saveToFile();
    console.log('Current pendingAccess:', JSON.stringify(pendingAccess));
  } else {
    console.log('Token not found for update:', token);
  }
};

const removePendingAccess = async (token) => {
  console.log('Removing pending access:', token);
  delete pendingAccess[token];
  await saveToFile();
  console.log('Current pendingAccess:', JSON.stringify(pendingAccess));
};

const getAllPendingAccess = () => {
  console.log('Getting all pending access');
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
  console.log('Cleanup completed. Current pendingAccess:', JSON.stringify(pendingAccess));
};

module.exports = {
  setPendingAccess,
  getPendingAccess,
  updatePendingAccess,
  removePendingAccess,
  getAllPendingAccess,
  cleanupPendingAccess
};
