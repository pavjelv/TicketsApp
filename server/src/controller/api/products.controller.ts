import express from "express";

const router = express.Router();

import {auth} from "../../auth/auth";
import {IProductService, ProductService} from "../../service/product.service";

const productService: IProductService = new ProductService();

// stub
export class ProductsController {
    getAll() {
        new ProductService().getAll({} as any, {} as any, {} as any);
    }

    addProduct() {
        
    }
}

router.get('/allProducts', auth.required, productService.getAll)

router.post('/addProduct', auth.required, productService.addProduct)

module.exports = router;
