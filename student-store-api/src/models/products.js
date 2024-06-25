const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

    getAllProducts = async (filter = {}, orderBy = {}) => {
        return prisma.product.findMany({
            where: filter,
            orderBy: orderBy,
          });
    };

    getProductById = async (id) => {
        return prisma.product.findUnique({ 
            where: { id: parseInt(id) } 
        });
    };

    createProduct = async (productData) => {
        return prisma.product.create({ 
            data: productData 
        });
    };

    updateProduct = async (id, productData) => {
        return prisma.product.update({
            where: { id: parseInt(id) },
            data: productData,
          });
    };

    deleteProduct = async (id) => {
        return prisma.product.delete({ 
            where: { id: parseInt(id) } 
        });
    };


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};