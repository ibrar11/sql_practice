const model = require("../../../db/models/index")

const getSortedProducts = async (req, res) => {
    try {
        const sortedProducts = await model.sequelize.query(
            `SELECT *
                FROM "Products"
                ORDER BY "Price" DESC
            `
        )

        return res.json({
            products: sortedProducts,
            status: 'success'
        })

    }catch (err) {
        console.log("Error while fetching products",err);
        return res.json({
            message: err.message,
            status: 'error'
        })
    }
}

const addProducts = async (req, res) => {
    try {
        const { products } = req.body;
        products?.forEach(async (product) => {
            const response = await model.sequelize.query(
                `INSERT INTO "Products"
                    ("ProductName", "SupplierId", "CategoryId", "Unit", "Price") VALUES
                    ($$${product.productName}$$, ${product.supplierId}, ${product.categoryId}, $$${product.unit}$$, ${product.price})
                `
            )
        })
        return res.json({
            status: 'success'
        })

    }catch (err) {
        console.log("Error while inserting products",err);
        return res.json({
            message: err.message,
            status: 'error'
        })
    }
}

module.exports = {
    getSortedProducts,
    addProducts
}