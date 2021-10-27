import express from "express";

const router = express.Router();

router.use('/login', require('./login'))
router.use('/user', require('./user'))
router.use('/orders', require('./orders'))
router.use('/products', require('./products'))

module.exports = router;
