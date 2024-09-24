// Fallback to in-memory storage if Edge Config is not available
let storage = {};

const getEdgeConfig = () => {
  if (process.env.EDGE_CONFIG) {
    const { createClient } = require('@vercel/edge-config');
    return createClient(process.env.EDGE_CONFIG);
  }
  return null;
};

const PREFIX = 'pending_access:';

const setPendingAccess = async (token, data) => {
  console.log('Setting pending access:', token, JSON.stringify(data));
  const edge = getEdgeConfig();
  if (edge) {
    await edge.set(`${PREFIX}${token}`, { ...data, timestamp: Date.now() });
  } else {
    storage[token] = { ...data, timestamp: Date.now() };
  }
  console.log('Pending access set for token:', token);
};

const getPendingAccess = async (token) => {
  console.log('Getting pending access for token:', token);
  const edge = getEdgeConfig();
  let data;
  if (edge) {
    data = await edge.get(`${PREFIX}${token}`);
  } else {
    data = storage[token];
  }
  console.log('Pending access for token:', data);
  return data;
};

const updatePendingAccess = async (token, data) => {
  console.log('Updating pending access:', token, JSON.stringify(data));
  const existingData = await getPendingAccess(token);
  if (existingData) {
    const edge = getEdgeConfig();
    if (edge) {
      await edge.set(`${PREFIX}${token}`, { ...existingData, ...data, timestamp: Date.now() });
    } else {
      storage[token] = { ...existingData, ...data, timestamp: Date.now() };
    }
    console.log('Pending access updated for token:', token);
  } else {
    console.log('Token not found for update:', token);
  }
};

const removePendingAccess = async (token) => {
  console.log('Removing pending access:', token);
  const edge = getEdgeConfig();
  if (edge) {
    await edge.delete(`${PREFIX}${token}`);
  } else {
    delete storage[token];
  }
  console.log('Pending access removed for token:', token);
};

const getAllPendingAccess = async () => {
  const edge = getEdgeConfig();
  if (edge) {
    const allData = await edge.getAll();
    const pendingAccess = {};
    for (const [key, value] of Object.entries(allData)) {
      if (key.startsWith(PREFIX)) {
        const token = key.slice(PREFIX.length);
        pendingAccess[token] = value;
      }
    }
    return pendingAccess;
  } else {
    return storage;
  }
};

const cleanupPendingAccess = async () => {
  console.log('Starting cleanup of pending access');
  const now = Date.now();
  const edge = getEdgeConfig();
  if (edge) {
    const allData = await edge.getAll();
    for (const [key, value] of Object.entries(allData)) {
      if (key.startsWith(PREFIX) && now - value.timestamp > 24 * 60 * 60 * 1000) {
        await edge.delete(key);
      }
    }
  } else {
    for (const [token, value] of Object.entries(storage)) {
      if (now - value.timestamp > 24 * 60 * 60 * 1000) {
        delete storage[token];
      }
    }
  }
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