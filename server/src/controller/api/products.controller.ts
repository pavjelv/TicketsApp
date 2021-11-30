import express from "express";

const router = express.Router();

import {auth} from "../../auth/auth";
import {IProductService, ProductService} from "../../service/product.service";

const productService: IProductService = new ProductService();

router.get('/allProducts', auth.required, productService.getAll)

router.post('/addProduct', auth.required, productService.addProduct)

module.exports = router;
