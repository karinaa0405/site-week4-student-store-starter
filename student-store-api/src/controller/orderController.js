const orderModel = require('../models/orders.js');
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

const getAllOrders = async (req, res) => {
    try {
      const orders = await orderModel.getAllOrders();
      res.status(200).json(orders);
    } 
    catch (error) {
      res.status(400).json({ error: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
      const order = await orderModel.getOrderById(req.params.id);
      if (order) {
        res.status(200).json(order);
      } 
      else {
        res.status(404).json({ error: "Order not found" });
      }
    } 
    catch (error) {
      res.status(400).json({ error: error.message });
    }
};

const createOrder = async (req, res) => {
    try {
      const newOrder = await orderModel.createOrder(req.body);
      res.status(201).json(newOrder);
    } 
    catch (error) {
      res.status(400).json({ error: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
      const updatedOrder = await orderModel.updateOrder(req.params.id, req.body);
      if (updatedOrder) {
        res.status(200).json(updatedOrder);
      } 
      else {
        res.status(404).json({ error: "Order not found" });
      }
    } 
    catch (error) {
      res.status(400).json({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
      const deletedOrder = await orderModel.deleteOrder(req.params.id);
      if (deletedOrder) {
        res.status(200).json(deletedOrder);
      } 
      else {
        res.status(404).json({ error: "Order not found" });
      }
    } 
    catch (error) {
      res.status(400).json({ error: error.message });
    }
};

const addItemsToOrder = async (req, res) => {
  try {
    const orderItem = await orderModel.addItemToOrder(req.params.order_id, req.body);
    res.json(orderItem);
  } 
  catch (error) {
    console.error("Error adding item to order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteItemFromOrder = async (req, res) => {
  try {
    const orderItem = await orderModel.deleteItemFromOrder(req.params.order_id, req.params.order_item_id);
    res.json(orderItem);
  } 
  catch (error) {
    console.error("Error deleting item to order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOrderTotalPrice = async (req, res) => {
  try {
    const orderTotal = await orderModel.getOrderTotalPrice(req.params.order_id);
    res.json(orderTotal);
  }
  catch (error) {
    console.error("Error getting total price from order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    addItemsToOrder,
    deleteItemFromOrder,
    getOrderTotalPrice,
};
  