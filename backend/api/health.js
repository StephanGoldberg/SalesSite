const fs = require('fs').promises;
const path = require('path');

const checkTmpDirectoryWritable = async () => {
  const testFile = path.join('/tmp', 'test-write.txt');
  try {
    await fs.writeFile(testFile, 'Test write');
    await fs.unlink(testFile);
    return true;
  } catch (error) {
    console.error('Error writing to /tmp directory:', error);
    return false;
  }
};

module.exports = async (req, res) => {
  const isTmpWritable = await checkTmpDirectoryWritable();
  
  res.status(200).json({
    status: 'OK',
    message: 'API is running',
    tmpDirectoryWritable: isTmpWritable
  });
};