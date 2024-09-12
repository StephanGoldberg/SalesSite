const fs = require('fs').promises;
const path = require('path');

const DB_FILE = path.join('/tmp', 'pendingAccess.json');

const readDatabase = async () => {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    console.log('Database read successfully');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Database file not found, creating new one');
      return {};
    }
    console.error('Error reading database:', error);
    throw error;
  }
};

const writeDatabase = async (data) => {
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
    console.log('Database written successfully');
  } catch (error) {
    console.error('Error writing database:', error);
    throw error;
  }
};

const setPendingAccess = async (token, data) => {
  console.log('Setting pending access:', token, JSON.stringify(data));
  try {
    const db = await readDatabase();
    db[token] = { ...data, timestamp: Date.now() };
    await writeDatabase(db);
    console.log('Pending access set for token:', token);
  } catch (error) {
    console.error('Error setting pending access:', error);
    throw error;
  }
};

const getPendingAccess = async (token) => {
  console.log('Getting pending access for token:', token);
  try {
    const db = await readDatabase();
    const access = db[token];
    console.log('Retrieved pending access:', JSON.stringify(access));
    return access;
  } catch (error) {
    console.error('Error getting pending access:', error);
    throw error;
  }
};

const updatePendingAccess = async (token, data) => {
  console.log('Updating pending access:', token, JSON.stringify(data));
  try {
    const db = await readDatabase();
    if (db[token]) {
      db[token] = { ...db[token], ...data, timestamp: Date.now() };
      await writeDatabase(db);
      console.log('Pending access updated for token:', token);
    } else {
      console.log('Token not found for update:', token);
    }
  } catch (error) {
    console.error('Error updating pending access:', error);
    throw error;
  }
};

const removePendingAccess = async (token) => {
  console.log('Removing pending access:', token);
  try {
    const db = await readDatabase();
    delete db[token];
    await writeDatabase(db);
    console.log('Pending access removed for token:', token);
  } catch (error) {
    console.error('Error removing pending access:', error);
    throw error;
  }
};

const getAllPendingAccess = async () => {
  console.log('Getting all pending access');
  try {
    const db = await readDatabase();
    console.log('All pending access:', JSON.stringify(db));
    return Object.values(db);
  } catch (error) {
    console.error('Error getting all pending access:', error);
    throw error;
  }
};

const cleanupPendingAccess = async () => {
  console.log('Starting cleanup of pending access');
  try {
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
    console.log(`Cleanup completed. Removed ${cleaned} entries. Remaining entries: ${Object.keys(db).length}`);
  } catch (error) {
    console.error('Error during cleanup of pending access:', error);
    throw error;
  }
};

module.exports = {
  setPendingAccess,
  getPendingAccess,
  updatePendingAccess,
  removePendingAccess,
  getAllPendingAccess,
  cleanupPendingAccess
};
