import express from "express";

const router = express.Router();

router.use('/login', require('./login'))
router.use('/user', require('./user'))
router.use('/orders', require('./orders.controller'))
router.use('/products', require('./products.controller'))

module.exports = router;
