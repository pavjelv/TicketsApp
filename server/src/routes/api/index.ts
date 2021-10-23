import express from "express";

const router = express.Router();

router.use('/users', require('./users'))
router.use('/user', require('./user'))
router.use('/tickets', require('./tickets'))

export default router;
