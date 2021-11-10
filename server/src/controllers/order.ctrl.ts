import {Order} from "../models/Order"
import {DetailedUser} from "../models/DetailedUser";
import {SecureUser} from "../models/SecureUser";
import {DetailedUserModel, SecureUserModel, OrderModel} from "@pavo/shared-services-shared/src";
import {OrderDao} from "../models/dao/order.dao";
import {NextFunction, Request, Response} from "express";

export function addOrder (req: Request, res: Response) {
    let order = ({
        product: req.body.product
    })

    const finalOrder = new Order(order);
    return finalOrder.save((err: unknown, order: OrderDao): any => {
        if (err) {
            res.send(err);
        } else if (!order) {
            res.status(400).send();
        }
        res.status(200).send();
    })
}

export function addParticipant (req: Request, res: Response) {
    // @ts-ignore
    const { payload: { id } } = req;
    SecureUser.findById(id).then((user: SecureUserModel) => {
        DetailedUser.find({"email" : user.email}).then((userProps: DetailedUserModel[]) => {
            Order.update({_id: req.body.orderId}, {$push: { participants: userProps[0]._id || ''} }, null, function(err: unknown) {
                if(err) {
                    res.send(err);
                }
                res.status(200).send()
            })
        });
    });
}

export function assign (req: Request, res: Response, next: NextFunction) {
    Order.updateOne(
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
    Order.updateOne({_id: req.body.orderId}, {$set:{"isResolved": "true"}}, null, function(err: unknown) {
        if(err) {
            return next(err)
        }
        res.status(200).send()
    })
}

export function getAll (_req: Request, res: Response, next: NextFunction) {
    Order.find({})
        .populate('product')
        .populate('participants')
        .exec((err: unknown, orders: OrderModel[])=> {
            if (err)
                res.send(err)
            else if (!orders)
                res.status(404).send()
            else
                res.send(orders)
            next()
        });
}

export function getOrder (req: Request, res: Response, next: NextFunction) {
    Order.findById(req.params.id)
        .populate('product')
        .populate('participants')
        .exec((err: unknown, order: OrderModel)=> {
        if (err)
            res.send(err)
        else if (!order)
            res.status(404).send()
        else
            res.send(order)
        next()
    })
}

export function getAllUnresolved (_req: Request, res: Response, next: NextFunction) {
    Order.find({"isResolved": false})
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
    Order.find({"isResolved": false})
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
    Order.find({})
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

export function getUnassignedUnresolvedOrders (_req: Request, res: Response, next: NextFunction) {
    Order.find({"isResolved": false})
        .populate('reporter')
        .populate('assignee')
        .exec((err: unknown, orders: OrderModel[])=> {
        if (err) {
            res.send(err);
        } else if (!orders) {
            res.status(404).send();
        } else {
            res.send(orders.filter((t) => !t.assignee));
        }
        next();
    })
}

export function getAssignedOrders (req: Request, res: Response, next: NextFunction) {
    Order.find({})
        .populate('reporter')
        .populate ('assignee')
        .exec((err: unknown, orders: OrderModel[]) => {
            if (err) {
                res.send(err);
            }
            else if (!orders) {
                res.status(404).send();
            } else {
                res.send(orders.filter((t) => t.assignee._id === req.body.id));
            }
            next();
        })
}
