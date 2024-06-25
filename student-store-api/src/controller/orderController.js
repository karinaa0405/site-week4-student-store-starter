const orderModel = require('../models/orders.js');

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

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};
  