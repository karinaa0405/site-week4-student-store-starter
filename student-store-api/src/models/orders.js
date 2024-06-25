const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

    getAllOrders = async () => {
        return prisma.order.findMany({
            include:{
                order_items: true
            }
        });
    };

    getOrderById = async (id) => {
        return prisma.order.findUnique({ 
            where: { order_id: parseInt(id) }, 
            include:{
                order_items: true
            } 
        });
    };

    createOrder = async (orderData) => {
        return prisma.order.create({ 
            data: orderData 
        });
    };

    updateOrder = async (id, orderData) => {
        return prisma.order.update({
            where: { order_id: parseInt(id) },
            data: orderData,
          });
    };

    deleteOrder = async (id) => {
        return prisma.order.delete({ 
            where: { order_id: parseInt(id) } 
        });
    };


module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};