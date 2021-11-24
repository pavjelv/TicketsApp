import express from "express";

const router = express.Router();

router.use('/login', require('./login'))
router.use('/user', require('./user'))
router.use('/orders', require('./orders.controller'))
router.use('/products', require('./products.controller'))
router.use('/upload', require('./upload.controller'))

module.exports = router;
