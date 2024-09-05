const fs = require('fs').promises;
const path = require('path');

const DB_FILE = path.join('/tmp', 'pendingAccess.json');

let pendingAccess = {};

// Helper function to save data to file
const saveToFile = async () => {
  await fs.writeFile(DB_FILE, JSON.stringify(pendingAccess));
};

// Load data from file on module initialization
const loadFromFile = async () => {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    pendingAccess = JSON.parse(data);
  } catch (error) {
    console.log('No existing database found, starting fresh');
  }
};

// Initialize the database
loadFromFile();

const setPendingAccess = async (token, data) => {
  console.log('Setting pending access:', token, data);
  pendingAccess[token] = data;
  await saveToFile();
};

const getPendingAccess = (token) => {
  console.log('Getting pending access for token:', token);
  return pendingAccess[token];
};

const updatePendingAccess = async (token, data) => {
  console.log('Updating pending access:', token, data);
  pendingAccess[token] = { ...pendingAccess[token], ...data };
  await saveToFile();
};

const removePendingAccess = async (token) => {
  console.log('Removing pending access:', token);
  delete pendingAccess[token];
  await saveToFile();
};

const getAllPendingAccess = () => {
  return pendingAccess;
};

module.exports = {
  setPendingAccess,
  getPendingAccess,
  updatePendingAccess,
  removePendingAccess,
  getAllPendingAccess
};
