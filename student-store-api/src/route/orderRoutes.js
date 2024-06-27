const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router.get("/", orderController.getAllOrders);

router.get("/:id", orderController.getOrderById);
router.get("/:order_id/total", orderController.getOrderTotalPrice);

router.post("/", orderController.createOrder);
router.post("/:order_id/items", orderController.addItemsToOrder);

router.put("/:id", orderController.updateOrder);

router.delete("/:id", orderController.deleteOrder);
router.delete("/:order_id/items/:order_item_id", orderController.deleteItemFromOrder);

module.exports = router;