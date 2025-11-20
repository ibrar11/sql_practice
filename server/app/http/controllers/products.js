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

const getFilteredProducts = async (req, res) => {
    try {
        const filteredProducts = await model.sequelize.query(
            `SELECT *
                FROM "Products"
                WHERE "Price"IS NOT NULL AND
                "Price" NOT IN (22,30,40)
            `
        )

        return res.json({
            products: filteredProducts,
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
        for (const product of products) {
            await model.sequelize.query(
                `INSERT INTO "Products"
                    ("ProductName", "SupplierId", "CategoryId", "Unit", "Price")
                    VALUES ($1, $2, $3, $4, $5)`,
                    {
                        bind: [
                            product.productName,
                            product.supplierId,
                            product.categoryId,
                            product.unit,
                            product.price,
                        ],
                    }
            );
        }
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

const removeProducts = async (req, res) => {
    try {
        const { id } = req.params;
        await model.sequelize.query(
            `DELETE FROM "Products"
                WHERE "id" = $1`,
                {
                    bind: [
                        id
                    ],
                }
        );
        return res.json({
            status: 'success'
        })

    }catch (err) {
        console.log("Error while deleting products",err);
        return res.json({
            message: err.message,
            status: 'error'
        })
    }
}

module.exports = {
    getSortedProducts,
    addProducts,
    getFilteredProducts,
    removeProducts,
}