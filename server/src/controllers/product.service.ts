import {NextFunction, Request, Response} from "express";
import {ProductRepository} from "../models/ProductRepository";
import {ProductModel} from "@pavo/shared-services-shared/src";

export interface IProductService {
    addProduct: (req: Request, res: Response, _next: NextFunction) => Response;
    getAll: (_req: Request, res: Response, next: NextFunction) => void;
}

export class ProductService implements IProductService {

    getAll(_req: Request, res: Response, next: NextFunction): void {
        ProductRepository.find({})
            .exec((err: unknown, products: ProductModel[])=> {
                if (err)
                    res.status(500).send(err)
                else if (!products)
                    res.status(404).send()
                else
                    res.send(products)
                next()
            });
    }

    addProduct(req: Request, res: Response, _next: NextFunction): Response {
        let product = ({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            participantsAmount: req.body.participantsAmount
        })

        if (!product.title) {
            return res.status(422).json({
                errors: {
                    title: 'is required',
                },
            });
        }

        if (!product.description) {
            return res.status(422).json({
                errors: {
                    description: 'is required',
                },
            });
        }

        if (!product.price) {
            return res.status(422).json({
                errors: {
                    price: 'is required',
                },
            });
        }

        if (!product.participantsAmount) {
            return res.status(422).json({
                errors: {
                    participantsAmount: 'is required',
                },
            });
        }

        const finalProduct = new ProductRepository(product);
        return finalProduct.save()
            .then(() => res.json(finalProduct));
    }
}
