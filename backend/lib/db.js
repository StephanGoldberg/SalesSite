const pendingAccessKey = 'PENDING_ACCESS';

const getPendingAccessData = () => {
  try {
    return JSON.parse(process.env[pendingAccessKey] || '{}');
  } catch (error) {
    console.error('Error parsing pending access data:', error);
    return {};
  }
};

const setPendingAccessData = async (data) => {
  try {
    // In a real Vercel environment, you would use their API to update the environment variable
    // For local testing, we'll just update process.env
    process.env[pendingAccessKey] = JSON.stringify(data);
  } catch (error) {
    console.error('Error setting pending access data:', error);
  }
};

const setPendingAccess = async (token, data) => {
  console.log('Setting pending access:', token, JSON.stringify(data));
  const pendingAccess = getPendingAccessData();
  pendingAccess[token] = { ...data, timestamp: Date.now() };
  await setPendingAccessData(pendingAccess);
};

const getPendingAccess = (token) => {
  console.log('Getting pending access for token:', token);
  const pendingAccess = getPendingAccessData();
  return pendingAccess[token];
};

const updatePendingAccess = async (token, data) => {
  console.log('Updating pending access:', token, JSON.stringify(data));
  const pendingAccess = getPendingAccessData();
  if (pendingAccess[token]) {
    pendingAccess[token] = { ...pendingAccess[token], ...data, timestamp: Date.now() };
    await setPendingAccessData(pendingAccess);
  }
};

const removePendingAccess = async (token) => {
  console.log('Removing pending access:', token);
  const pendingAccess = getPendingAccessData();
  delete pendingAccess[token];
  await setPendingAccessData(pendingAccess);
};

const getAllPendingAccess = () => {
  return getPendingAccessData();
};

const cleanupPendingAccess = async () => {
  console.log('Starting cleanup of pending access');
  const pendingAccess = getPendingAccessData();
  const now = Date.now();
  const cleanedPendingAccess = Object.fromEntries(
    Object.entries(pendingAccess).filter(([_, value]) => {
      // Keep entries less than 24 hours old
      return now - value.timestamp < 24 * 60 * 60 * 1000;
    })
  );
  await setPendingAccessData(cleanedPendingAccess);
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
