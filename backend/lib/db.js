const { createClient } = require('@vercel/edge-config');

let edgeConfigClient;

const getEdgeConfig = () => {
  if (!edgeConfigClient) {
    if (!process.env.EDGE_CONFIG) {
      console.error('EDGE_CONFIG environment variable is not set');
      throw new Error('EDGE_CONFIG environment variable is not set');
    }
    edgeConfigClient = createClient(process.env.EDGE_CONFIG);
    console.log('Edge Config client created');
  }
  return edgeConfigClient;
};

const setPendingAccess = async (token, data) => {
  console.log('Setting pending access:', token, JSON.stringify(data));
  try {
    const config = getEdgeConfig();
    await config.set(`pending:${token}`, { ...data, timestamp: Date.now() });
    console.log('Pending access set for token:', token);
  } catch (error) {
    console.error('Error setting pending access:', error);
    console.error('Error details:', error.stack);
    throw error;
  }
};

const getPendingAccess = async (token) => {
  console.log('Getting pending access for token:', token);
  try {
    const config = getEdgeConfig();
    const access = await config.get(`pending:${token}`);
    console.log('Retrieved pending access:', JSON.stringify(access));
    return access;
  } catch (error) {
    console.error('Error getting pending access:', error);
    console.error('Error details:', error.stack);
    throw error;
  }
};

const updatePendingAccess = async (token, data) => {
  console.log('Updating pending access:', token, JSON.stringify(data));
  try {
    const config = getEdgeConfig();
    const existingData = await config.get(`pending:${token}`);
    if (existingData) {
      await config.set(`pending:${token}`, { ...existingData, ...data, timestamp: Date.now() });
      console.log('Pending access updated for token:', token);
    } else {
      console.log('Token not found for update:', token);
    }
  } catch (error) {
    console.error('Error updating pending access:', error);
    console.error('Error details:', error.stack);
    throw error;
  }
};

const removePendingAccess = async (token) => {
  console.log('Removing pending access:', token);
  try {
    const config = getEdgeConfig();
    await config.delete(`pending:${token}`);
    console.log('Pending access removed for token:', token);
  } catch (error) {
    console.error('Error removing pending access:', error);
    console.error('Error details:', error.stack);
    throw error;
  }
};

const getAllPendingAccess = async () => {
  console.log('Getting all pending access');
  try {
    const config = getEdgeConfig();
    const allItems = await config.getAll();
    console.log('All items from Edge Config:', JSON.stringify(allItems));
    const pendingAccess = Object.entries(allItems)
      .filter(([key]) => key.startsWith('pending:'))
      .map(([_, value]) => value);
    console.log('All pending access:', JSON.stringify(pendingAccess));
    return pendingAccess;
  } catch (error) {
    console.error('Error getting all pending access:', error);
    console.error('Error details:', error.stack);
    throw error;
  }
};

const cleanupPendingAccess = async () => {
  console.log('Starting cleanup of pending access');
  try {
    const config = getEdgeConfig();
    const allItems = await config.getAll();
    const now = Date.now();
    let cleaned = 0;
    for (const [key, value] of Object.entries(allItems)) {
      if (key.startsWith('pending:') && now - value.timestamp >= 24 * 60 * 60 * 1000) {
        await config.delete(key);
        cleaned++;
      }
    }
    console.log(`Cleanup completed. Removed ${cleaned} entries.`);
  } catch (error) {
    console.error('Error during cleanup of pending access:', error);
    console.error('Error details:', error.stack);
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
