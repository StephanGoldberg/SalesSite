const fs = require('fs').promises;
const path = require('path');

const DB_FILE = path.join(process.cwd(), 'pending-access.json');

async function readDB() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {};
    }
    throw error;
  }
}

async function writeDB(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

exports.setPendingAccess = async (token, data) => {
  const db = await readDB();
  db[token] = data;
  await writeDB(db);
};

exports.getPendingAccess = async () => {
  return await readDB();
};

exports.updatePendingAccess = async (token, data) => {
  const db = await readDB();
  db[token] = data;
  await writeDB(db);
};

exports.deletePendingAccess = async (token) => {
  const db = await readDB();
  delete db[token];
  await writeDB(db);
};