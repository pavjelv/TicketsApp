import express from "express";

const router = express.Router();

import {auth} from "../auth";
import * as orderController from "../../controllers/order.ctrl";

router.get('/allOrders', auth.optional, orderController.getAll)

router.get('/getOrder/:id', auth.optional, orderController.getOrder)

router.post('/addOrder', auth.required, orderController.addOrder)

router.post('/getMyOrders', auth.required, orderController.getMyOrders)

router.post('/getAssignedOrders', auth.required, orderController.getAssignedOrders)

router.post('/assign', auth.required, orderController.assign)

router.post('/resolve', auth.required, orderController.resolve)

router.post('/answer', auth.required, orderController.addAnswer)

router.get('/getAllUnresolved', auth.required, orderController.getAllUnresolved)

router.post('/getUnassignedUnresolved', auth.required, orderController.getUnassignedUnresolvedOrders)

router.post('/getReportedUnresolved', auth.required, orderController.getMyUnresolvedOrders)

module.exports = router;
