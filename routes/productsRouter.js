const express = require('express');
const router = express.Router();
const authenticate = require('../authenticate');

/**
 * Route: localhost:3000/products'
 */

router
  .route('/')
  .get((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'plain/text');
    res.end('Sending all products');
  })
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, status: 'Posted successfully!' });
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /products');
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /products');
  });

/**
 * Route: localhost:3000/products/:productId'
 */

router
  .route('/:productId')
  .get((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'plain/text');
    res.end(`Fetching product ${req.params.productId}`);
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /products/${req.params.productId}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /products/${req.params.productId}`);
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end(
      `DELETE operation not supported on /products/${req.params.productId}`
    );
  });

module.exports = router;
