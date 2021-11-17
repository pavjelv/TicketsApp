import {OrderRepository} from "../models/OrderRepository"
import {DetailedUser} from "../models/DetailedUser";
import {SecureUser} from "../models/SecureUser";
import {DetailedUserModel, SecureUserModel, OrderModel} from "@pavo/shared-services-shared/src";
import {OrderDao} from "../models/dao/order.dao";
import {NextFunction, Request, Response} from "express";

export interface IOrderService {
    addOrder: (req: Request, res: Response) => void;
    addParticipant: (req: Request, res: Response) => void;
    getAll: (_req: Request, res: Response, next: NextFunction) => void;
    getOrder: (req: Request, res: Response, next: NextFunction) => void;
}

export class OrderService implements IOrderService {

    addOrder(req: Request, res: Response): void {
        let order = ({
            product: req.body.product
        })

        const finalOrder = new OrderRepository(order);
        return finalOrder.save((err: unknown, order: OrderDao): any => {
            if (err) {
                res.status(500).send(err);
            } else if (!order) {
                res.status(400).send();
            }
            res.status(200).send();
        })
    }

    addParticipant(req: Request, res: Response): void {
        // @ts-ignore
        const { payload: { id } } = req;
        SecureUser.findById(id).then((user: SecureUserModel) => {
            DetailedUser.find({"email" : user.email}).then((userProps: DetailedUserModel[]) => {
                const orderId = req.body.orderId;
                OrderRepository.findById(orderId)
                    .populate('product')
                    .exec((err: unknown, order: OrderModel)=> {
                        if (err) {
                            res.status(500).send();
                            return;
                        }
                        if (order.participants?.length < order.product.participantsAmount) {
                            OrderRepository.update({_id: orderId}, {$push: {participants: userProps[0]._id || ''}}, null, function (err: unknown) {
                                if (err) {
                                    res.status(500).send(err);
                                }
                                res.status(200).send()
                            })
                        } else {
                            res.status(500).json({
                                errors: {
                                    participantsAmount: 'Too many participants!',
                                },
                            });
                        }
                    })
            });
        });
    }

    getAll(_req: Request, res: Response, next: NextFunction): void {
        OrderRepository.find({})
            .populate('product')
            .populate('participants')
            .exec((err: unknown, orders: OrderModel[])=> {
                if (err)
                    res.status(500).send(err)
                else if (!orders)
                    res.status(404).send()
                else
                    res.send(orders)
                next()
            });
    }

    getOrder(req: Request, res: Response, next: NextFunction): void {
        OrderRepository.findById(req.params.id)
            .populate('product')
            .populate('participants')
            .exec((err: unknown, order: OrderModel)=> {
                if (err)
                    res.status(500).send(err)
                else if (!order)
                    res.status(404).send()
                else
                    res.send(order)
                next()
            })
    }
}

export function assign (req: Request, res: Response, next: NextFunction) {
    OrderRepository.updateOne(
        {_id: req.body.orderId},
        {$set:{"assignee": req.body.id}},
        null,
        function(err: unknown) {
        if (err) {
            return next(err)
        }
        res.status(200).send()
    })
}

export function resolve (req: Request, res: Response, next: NextFunction) {
    OrderRepository.updateOne({_id: req.body.orderId}, {$set:{"isResolved": "true"}}, null, function(err: unknown) {
        if(err) {
            return next(err)
        }
        res.status(200).send()
    })
}

export function getAllUnresolved (_req: Request, res: Response, next: NextFunction) {
    OrderRepository.find({"isResolved": false})
        .populate('reporter')
        .populate('assignee')
        .exec((err: unknown, orders: OrderModel[])=> {
        if (err) {
            res.send(err);
        } else if (!orders) {
            res.status(404).send();
        } else {
            res.send(orders);
        }
        next();
    })
}

export function getMyUnresolvedOrders (req: Request, res: Response, next: NextFunction) {
    OrderRepository.find({"isResolved": false})
        .populate('reporter')
        .populate('assignee')
        .exec((err: unknown, orders: OrderModel[])=> {
        if (err) {
            res.send(err);
        } else if (!orders) {
            res.status(404).send();
        } else {
            res.send(orders.filter((t) => t.reporter._id === req.body.id));
            next();
        }
    })
}

export function getMyOrders (req: Request, res: Response, next: NextFunction) {
    OrderRepository.find({})
        .populate('reporter')
        .populate('assignee')
        .exec((err: unknown, orders: OrderModel[]) => {
            if(err) {
                res.send(err)
            }
            else if (!orders) {
                res.status(404).send()
            }
            else {
                res.send(orders.filter((t) => t.reporter._id === req.body.id));
            }
            next();
        });
}
