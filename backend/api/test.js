module.exports = (req, res) => {
    console.log('Verbose test route accessed');
    console.log('Request method:', req.method);
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
  
    res.status(200).json({
      message: 'Verbose test route is working',
      method: req.method,
      headers: req.headers,
      body: req.body
    });
  };