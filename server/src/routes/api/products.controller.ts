import express from "express";

const router = express.Router();

import {auth} from "../auth";
import {IProductService, ProductService} from "../../controllers/product.service";

const productService: IProductService = new ProductService();

router.get('/allProducts', auth.optional, productService.getAll)

router.post('/addProduct', auth.required, productService.addProduct)

module.exports = router;
