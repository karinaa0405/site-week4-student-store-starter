const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

getAllOrderItems = async () => {
    return prisma.OrderItem.findMany();
};

getOrderItemById = async (id) => {
    return prisma.OrderItem.findUnique({ 
        where: { order_item_id: parseInt(id) } 
    });
};

createOrderItem = async (orderItemData) => {
    return prisma.OrderItem.create({ 
        data: orderItemData 
    });
};


module.exports = {
    getAllOrderItems,
    getOrderItemById,
    createOrderItem,
};