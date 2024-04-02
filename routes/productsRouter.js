const express = require('express');
const router = express.Router();
const authenticate = require('../utils/authenticate');

/**
 * Route: localhost:3000/products'
 */

router
  .route('/')
  .get((req, res) => {
    res.status(200).send('Sending all products');
  })
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.status(200).json({ success: true, status: 'Posted successfully!' });
  })
  .put((req, res) => {
    res.status(403).send('PUT operation not supported on /products');
  })
  .delete((req, res) => {
    res.status(403).send('DELETE operation not supported on /products');
  });

/**
 * Route: localhost:3000/products/:productId'
 */

router
  .route('/:productId')
  .get((req, res) => {
    res.status(200).send(`Fetching product ${req.params.productId}`);
  })
  .post((req, res, next) => {
    res
      .status(403)
      .send(
        `POST operation not supported on /products/${req.params.productId}`
      );
  })
  .put((req, res) => {
    res
      .status(403)
      .send(`PUT operation not supported on /products/${req.params.productId}`);
  })
  .delete((req, res) => {
    res
      .status(403)
      .send(
        `DELETE operation not supported on /products/${req.params.productId}`
      );
  });

module.exports = router;
