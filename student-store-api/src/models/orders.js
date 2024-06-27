const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

    const getAllOrders = async () => {
        return prisma.order.findMany({
            include:{
                order_items: true
            }
        });
    };

    const getOrderById = async (id) => {
        return prisma.order.findUnique({ 
            where: { order_id: parseInt(id) }, 
            include:{
                order_items: true
            } 
        });
    };

    const createOrder = async (orderData) => {
        return prisma.order.create({ 
            data: {
                customer_id: parseInt(orderData.customer_id),
                status: orderData.status
            } 
        });
    };

    const updateOrder = async (id, orderData) => {
        return prisma.order.update({
            where: { order_id: parseInt(id) },
            data: orderData,
          });
    };

    const deleteOrder = async (id) => {
        return prisma.order.delete({ 
            where: { order_id: parseInt(id) } 
        });
    };

    const addItemToOrder = async (orderId, orderItemData) => {
        // getting the product in order to calculate the price of the order item since you can have multiple of that same product in one order item
        const product = await prisma.product.findUnique({where: {id: parseInt(orderItemData.product_id)}});
        // getting the order where the order item should be added to 
        const order = await prisma.order.findUnique({where: {order_id: parseInt(orderId)}});
        // performing update on total price of the order
        await prisma.order.update({
            where: {order_id: parseInt(orderId)}, // finding the order 
            data: {
                // calculating the total of the order item (product price times the number of that product added to the the total price of the order)
                total_price: parseFloat(order.total_price) + parseFloat(product.price) * parseInt(orderItemData.quantity)
            }
        })
        // creating the order item to be added
        return prisma.orderItem.create({ 
            data: { 
                order_id: parseInt(orderId),
                product_id: parseInt(orderItemData.product_id),
                quantity: parseInt(orderItemData.quantity),
                price: parseFloat(product.price) * parseInt(orderItemData.quantity),
            } 
        });
    };

    const deleteItemFromOrder = async (orderId, orderItemId) => {
        // getting the order item to be deleted
        const orderItem = await prisma.orderItem.findUnique({where: {order_item_id: parseInt(orderItemId)}});
        // getting the order where the order item is to be deleted from 
        const order = await prisma.order.findUnique({where: {order_id: parseInt(orderId)}});
        // updating the total price of the order (when deleting an order item you want to delete its total from the order total price)
        await prisma.order.update({
            where: {order_id: parseInt(orderId)},
            data: {
                total_price: parseFloat(order.total_price) - parseFloat(orderItem.price)
            }
        })
        // deleting the order item from the order
        return prisma.orderItem.delete({ 
            where: {order_item_id: parseInt(orderItemId)}
        });
    }

    const getOrderTotalPrice = async (orderId) => {
        const order = await prisma.order.findUnique({ 
            where: {order_id: parseInt(orderId)}
        });

        return {total_price: order.total_price};
    }



module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    addItemToOrder,
    deleteItemFromOrder,
    getOrderTotalPrice,
};