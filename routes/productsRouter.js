const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
  res.end('Fetching all products');
});

router
  .route('/:productId')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res) => {
    res.end(`Fetching product ${req.params.productId}`);
  });

module.exports = router;
