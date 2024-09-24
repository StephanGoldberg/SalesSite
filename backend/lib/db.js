import { get, set, getAll } from '@vercel/edge-config';

const PREFIX = 'pending_access:';

const setPendingAccess = async (token, data) => {
  console.log('Setting pending access:', token, JSON.stringify(data));
  await set(`${PREFIX}${token}`, { ...data, timestamp: Date.now() });
  console.log('Pending access set for token:', token);
};

const getPendingAccess = async (token) => {
  console.log('Getting pending access for token:', token);
  const data = await get(`${PREFIX}${token}`);
  console.log('Pending access for token:', data);
  return data;
};

const updatePendingAccess = async (token, data) => {
  console.log('Updating pending access:', token, JSON.stringify(data));
  const existingData = await getPendingAccess(token);
  if (existingData) {
    await set(`${PREFIX}${token}`, { ...existingData, ...data, timestamp: Date.now() });
    console.log('Pending access updated for token:', token);
  } else {
    console.log('Token not found for update:', token);
  }
};

const removePendingAccess = async (token) => {
  console.log('Removing pending access:', token);
  await set(`${PREFIX}${token}`, null);
  console.log('Pending access removed for token:', token);
};

const getAllPendingAccess = async () => {
  const allData = await getAll();
  const pendingAccess = {};
  for (const [key, value] of Object.entries(allData)) {
    if (key.startsWith(PREFIX)) {
      const token = key.slice(PREFIX.length);
      pendingAccess[token] = value;
    }
  }
  return pendingAccess;
};

const cleanupPendingAccess = async () => {
  console.log('Starting cleanup of pending access');
  const now = Date.now();
  const allData = await getAll();
  for (const [key, value] of Object.entries(allData)) {
    if (key.startsWith(PREFIX) && now - value.timestamp > 24 * 60 * 60 * 1000) {
      await set(key, null);
    }
  }
  console.log('Cleanup completed');
};

export {
  setPendingAccess,
  getPendingAccess,
  updatePendingAccess,
  removePendingAccess,
  getAllPendingAccess,
  cleanupPendingAccess
};
