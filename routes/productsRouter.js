const express = require('express');
const productsRouter = express.Router();

productsRouter
  .route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res) => {
    res.end('Fetching all products');
  });

productsRouter
  .route('/:productId')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res) => {
    res.end(`Fetching product ${req.params.productId}`);
  });

module.exports = productsRouter;
