const PENDING_ACCESS_KEY = 'PENDING_ACCESS';

const getPendingAccessData = () => {
  try {
    const data = process.env[PENDING_ACCESS_KEY];
    console.log('Raw pending access data:', data);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error parsing pending access data:', error);
    return {};
  }
};

const setPendingAccessData = async (data) => {
  try {
    process.env[PENDING_ACCESS_KEY] = JSON.stringify(data);
    console.log('Updated pending access data:', process.env[PENDING_ACCESS_KEY]);
  } catch (error) {
    console.error('Error setting pending access data:', error);
  }
};

const setPendingAccess = async (token, data) => {
  console.log('Setting pending access:', token, JSON.stringify(data));
  const pendingAccess = getPendingAccessData();
  pendingAccess[token] = { ...data, timestamp: Date.now() };
  await setPendingAccessData(pendingAccess);
  console.log('Pending access after setting:', JSON.stringify(getPendingAccessData()));
};

const getPendingAccess = (token) => {
  console.log('Getting pending access for token:', token);
  const pendingAccess = getPendingAccessData();
  const access = pendingAccess[token];
  console.log('Retrieved pending access:', JSON.stringify(access));
  return access;
};

const updatePendingAccess = async (token, data) => {
  console.log('Updating pending access:', token, JSON.stringify(data));
  const pendingAccess = getPendingAccessData();
  if (pendingAccess[token]) {
    pendingAccess[token] = { ...pendingAccess[token], ...data, timestamp: Date.now() };
    await setPendingAccessData(pendingAccess);
    console.log('Pending access after updating:', JSON.stringify(getPendingAccessData()));
  } else {
    console.log('Token not found for update:', token);
  }
};

const removePendingAccess = async (token) => {
  console.log('Removing pending access:', token);
  const pendingAccess = getPendingAccessData();
  delete pendingAccess[token];
  await setPendingAccessData(pendingAccess);
  console.log('Pending access after removing:', JSON.stringify(getPendingAccessData()));
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
      return now - value.timestamp < 24 * 60 * 60 * 1000;
    })
  );
  await setPendingAccessData(cleanedPendingAccess);
  console.log('Cleanup completed. Current pending access:', JSON.stringify(getPendingAccessData()));
};

module.exports = {
  setPendingAccess,
  getPendingAccess,
  updatePendingAccess,
  removePendingAccess,
  getAllPendingAccess,
  cleanupPendingAccess
};
