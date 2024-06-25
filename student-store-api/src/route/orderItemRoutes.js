const express = require("express");
const router = express.Router();
const orderItemController = require("../controller/orderItemController");

router.get("/", orderItemController.getAllOrderItems);

router.get("/:id", orderItemController.getOrderItemById);

router.post("/", orderItemController.createOrderItem);

module.exports = router;