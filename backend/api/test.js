module.exports = (req, res) => {
    console.log('Test route accessed');
    try {
      console.log('Request method:', req.method);
      console.log('Request headers:', JSON.stringify(req.headers, null, 2));
      console.log('Request query:', JSON.stringify(req.query, null, 2));
      console.log('Request body:', JSON.stringify(req.body, null, 2));
  
      res.status(200).json({
        message: 'Test route is working',
        method: req.method,
        headers: req.headers,
        query: req.query,
        body: req.body
      });
    } catch (error) {
      console.error('Error in test route:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  };