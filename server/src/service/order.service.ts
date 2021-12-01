import {OrderRepository} from "../repository/order.repository"
import {DetailedUserRepository} from "../repository/detailed-user.repository";
import {SecureUserRepository} from "../repository/secure-user.repository";
import {DetailedUserModel, SecureUserModel, OrderModel} from "@pavo/shared-services-shared/src";
import {OrderDao} from "../repository/dao/order.dao";
import {NextFunction, Request, Response} from "express";

export interface IOrderService {
    addOrder: (req: Request, res: Response) => void;
    addParticipant: (req: Request, res: Response) => void;
    removeParticipant: (req: Request, res: Response) => void;
    getAll: (_req: Request, res: Response, next: NextFunction) => void;
    getOrder: (req: Request, res: Response, next: NextFunction) => void;
    getMyOrders: (req: Request, res: Response) => void;
    submit: (req: Request, res: Response) => void;
}

export class OrderService implements IOrderService {

    addOrder(req: Request, res: Response): void {
        let order = ({
            product: req.body.product,
            isSubmitted: false
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
        SecureUserRepository.findById(id).then((user: SecureUserModel) => {
            DetailedUserRepository.find({"email" : user.email}).then((userProps: DetailedUserModel[]) => {
                const orderId = req.body.orderId;
                OrderRepository.findById(orderId)
                    .populate('product')
                    .exec((err: unknown, order: OrderModel) => {
                        if (err) {
                            res.status(500).send();
                            return;
                        }
                        if (!order.participants.map(p => p._id).includes(userProps[0]._id)) {
                            if (order.participants?.length < order.product.participantsAmount) {
                                OrderRepository.update({_id: orderId}, {$push: {participants: userProps[0]._id || ''}}, null, function (err: unknown) {
                                    if (err) {
                                        res.status(500).send(err);
                                    }
                                    res.status(200).send();
                                })
                            } else {
                                res.status(500).json({
                                    errors: {
                                        participantsAmount: 'Too many participants!',
                                    },
                                });
                            }
                        } else {
                            res.status(500).send(err);
                        }
                    })
            });
        });
    }

    removeParticipant(req: Request, res: Response): void {
        // @ts-ignore
        const { payload: { id } } = req;
        SecureUserRepository.findById(id).then((user: SecureUserModel) => {
            DetailedUserRepository.find({"email" : user.email}).then((userProps: DetailedUserModel[]) => {
                const orderId = req.body.orderId;
                OrderRepository.findById(orderId)
                    .exec((err: unknown, order: OrderModel) => {
                        if (err) {
                            res.status(500).send();
                            return;
                        }
                        if (order.participants.map(p => p._id).includes(userProps[0]._id)) {
                            OrderRepository.update({_id: orderId}, {$pull: {participants: userProps[0]._id || ''}}, null, function (err: unknown) {
                                if (err) {
                                    res.status(500).send(err);
                                }
                                res.status(200).send();
                            })
                        } else {
                            res.status(500).send();
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

    getMyOrders(req: Request, res: Response): void {
        // @ts-ignore
        const { payload: { id } } = req;
        SecureUserRepository.findById(id).then((user: SecureUserModel) => {
            DetailedUserRepository.find({"email" : user.email}).then((userProps: DetailedUserModel[]) => {
                OrderRepository.findById({})
                    .exec((err: unknown, orders: OrderModel[]) => {
                        if (err) {
                            res.send(err);
                        } else if (!orders) {
                            res.status(404).send();
                        } else {
                            res.send(orders.filter((o) => o.participants.map(p => p._id).includes(userProps[0]._id)));
                            res.status(200).send();
                        }
                    });
            });
        });
    }



    submit(req: Request, res: Response): void {
        // @ts-ignore
        const { payload: { id } } = req;
        SecureUserRepository.findById(id).then((user: SecureUserModel) => {
            DetailedUserRepository.find({"email" : user.email}).then((userProps: DetailedUserModel[]) => {
                const orderId = req.body.orderId;
                OrderRepository.findById(orderId)
                    .populate('product')
                    .exec((err: unknown, order: OrderModel)=> {
                        if (err) {
                            res.status(500).send();
                            return;
                        }
                        if (!order.isSubmitted) {
                            if (userProps[0].role === "Admin") {
                                if (order.participants?.length === order.product.participantsAmount) {
                                    OrderRepository.updateOne({_id: orderId}, {$set: {"isSubmitted": true}}, null, function (err: unknown) {
                                        if (err) {
                                            res.status(500).send(err);
                                        }
                                        res.status(200).send()
                                    })
                                } else {
                                    res.status(500).json({
                                        errors: {
                                            participantsAmount: 'Not enough participants!',
                                        },
                                    });
                                }
                            } else {
                                res.status(500).json({
                                    errors: {
                                        isSubmitted: 'Operation is forbidden!',
                                    },
                                });
                            }
                        } else {
                            res.status(500).json({
                                errors: {
                                    isSubmitted: 'Submit operation is forbidden!',
                                },
                            });
                        }
                    })
            });
        });
    }
}


