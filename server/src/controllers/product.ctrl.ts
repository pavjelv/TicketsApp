import {NextFunction, Request, Response} from "express";
import {Product} from "../models/Product";
import {ProductModel} from "@pavo/shared-services-shared/src";


export function getAll (_req: Request, res: Response, next: NextFunction) {
    Product.find({})
        .exec((err: unknown, products: ProductModel[])=> {
            if (err)
                res.send(err)
            else if (!products)
                res.status(404).send()
            else
                res.send(products)
            next()
        });
}

export function addProduct (req: Request, res: Response, _next: NextFunction) {

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

    const finalProduct = new Product(product);

    return finalProduct.save()
            .then(() => res.json(finalProduct));
}
