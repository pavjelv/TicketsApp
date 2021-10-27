import express from "express";

const router = express.Router();

import {auth} from "../auth";

import * as productController from "../../controllers/product.ctrl"

router.get('/allProducts', auth.optional, productController.getAll)

router.post('/addProduct', auth.required, productController.addProduct)

module.exports = router;
