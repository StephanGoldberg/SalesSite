const { createClient } = require('@vercel/edge-config');

let edge = null;
let storage = {};

const initEdgeConfig = () => {
  if (process.env.EDGE_CONFIG && !edge) {
    try {
      edge = createClient(process.env.EDGE_CONFIG);
      console.log('Edge Config initialized successfully');
    } catch (error) {
      console.error('Error initializing Edge Config:', error);
      console.error('EDGE_CONFIG value:', process.env.EDGE_CONFIG);
      edge = null;
    }
  } else if (!process.env.EDGE_CONFIG) {
    console.warn('EDGE_CONFIG environment variable is not set');
  }
};

initEdgeConfig();

const PREFIX = 'pending_access:';

const setPendingAccess = async (token, data) => {
  console.log('Setting pending access:', token, JSON.stringify(data));
  const fullData = { ...data, timestamp: Date.now() };
  if (edge) {
    try {
      await edge.set(`${PREFIX}${token}`, fullData);
      console.log('Data set in Edge Config successfully');
    } catch (error) {
      console.error('Error setting data in Edge Config:', error);
      storage[token] = fullData;
      console.log('Data set in local storage as fallback');
    }
  } else {
    storage[token] = fullData;
    console.log('Data set in local storage (Edge Config not available)');
  }
  console.log('Pending access set for token:', token);
};

const getPendingAccess = async (token) => {
  console.log('Getting pending access for token:', token);
  let data;
  if (edge) {
    try {
      data = await edge.get(`${PREFIX}${token}`);
      console.log('Data retrieved from Edge Config successfully');
    } catch (error) {
      console.error('Error getting data from Edge Config:', error);
      data = storage[token];
      console.log('Data retrieved from local storage as fallback');
    }
  } else {
    data = storage[token];
    console.log('Data retrieved from local storage (Edge Config not available)');
  }
  console.log('Pending access for token:', data);
  return data;
};

const updatePendingAccess = async (token, data) => {
  console.log('Updating pending access:', token, JSON.stringify(data));
  const existingData = await getPendingAccess(token);
  if (existingData) {
    const updatedData = { ...existingData, ...data, timestamp: Date.now() };
    if (edge) {
      try {
        await edge.set(`${PREFIX}${token}`, updatedData);
        console.log('Data updated in Edge Config successfully');
      } catch (error) {
        console.error('Error updating data in Edge Config:', error);
        storage[token] = updatedData;
        console.log('Data updated in local storage as fallback');
      }
    } else {
      storage[token] = updatedData;
      console.log('Data updated in local storage (Edge Config not available)');
    }
    console.log('Pending access updated for token:', token);
  } else {
    console.log('Token not found for update:', token);
  }
};

const removePendingAccess = async (token) => {
  console.log('Removing pending access:', token);
  if (edge) {
    try {
      await edge.delete(`${PREFIX}${token}`);
      console.log('Data removed from Edge Config successfully');
    } catch (error) {
      console.error('Error removing data from Edge Config:', error);
    }
  }
  delete storage[token];
  console.log('Pending access removed for token:', token);
};

const getAllPendingAccess = async () => {
  if (edge) {
    try {
      const allData = await edge.getAll();
      console.log('All data retrieved from Edge Config successfully');
      const pendingAccess = {};
      for (const [key, value] of Object.entries(allData)) {
        if (key.startsWith(PREFIX)) {
          const token = key.slice(PREFIX.length);
          pendingAccess[token] = value;
        }
      }
      return pendingAccess;
    } catch (error) {
      console.error('Error getting all data from Edge Config:', error);
    }
  }
  console.log('Returning all data from local storage');
  return storage;
};

const cleanupPendingAccess = async () => {
  console.log('Starting cleanup of pending access');
  const now = Date.now();
  if (edge) {
    try {
      const allData = await edge.getAll();
      for (const [key, value] of Object.entries(allData)) {
        if (key.startsWith(PREFIX) && now - value.timestamp > 24 * 60 * 60 * 1000) {
          await edge.delete(key);
        }
      }
      console.log('Cleanup completed in Edge Config');
    } catch (error) {
      console.error('Error during cleanup in Edge Config:', error);
    }
  }
  for (const [token, value] of Object.entries(storage)) {
    if (now - value.timestamp > 24 * 60 * 60 * 1000) {
      delete storage[token];
    }
  }
  console.log('Cleanup completed in local storage');
};

module.exports = {
  setPendingAccess,
  getPendingAccess,
  updatePendingAccess,
  removePendingAccess,
  getAllPendingAccess,
  cleanupPendingAccess
};