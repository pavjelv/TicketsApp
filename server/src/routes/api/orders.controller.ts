import express from "express";

const router = express.Router();

import {auth} from "../auth";
import {IOrderService, OrderService} from "../../controllers/order.service";

const orderService: IOrderService = new OrderService();

router.post('/addOrder', auth.required, orderService.addOrder)

router.put('/addParticipant', auth.required, orderService.addParticipant)

router.get('/allOrders', auth.optional, orderService.getAll)

router.get('/getOrder/:id', auth.optional, orderService.getOrder)

module.exports = router;
