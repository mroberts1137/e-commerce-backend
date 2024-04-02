const cors = require('cors');

const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3443'
];

const corsOptionsDelegate = (req, cb) => {
  let corsOptions;
  if (whitelist.includes(req.header('Origin'))) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  cb(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
