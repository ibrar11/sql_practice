const model = require("../../../db/models/index")

const getSortedProducts = async (req, res) => {
    try {
        const sortedProducts = await model.sequelize.query(
            `SELECT *
                FROM "Products"
                ORDER BY "Price" DESC
            `
        )

        const productCount = await model.sequelize.query(
            `SELECT COUNT("id")
                FROM "Products"
            `
        )

        const priceAggregatedValues = await model.sequelize.query(
            `SELECT SUM("Price") as TotalPrice, AVG("Price") as AveragePrice
                FROM "Products"
            `
        )

        return res.json({
            products: sortedProducts,
            productCount,
            priceAggregatedValues,
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

        // Select Top (num of records e.g, 2,3) is not supported in postgres and mysql
        const highestPriceProduct = await model.sequelize.query(
            `SELECT  *
                FROM "Products"
                ORDER BY "Price" DESC
                LIMIT 1
            `
        )

        return res.json({
            products: filteredProducts,
            highestPriceProduct,
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

module.exports = {
    getSortedProducts,
    addProducts,
    getFilteredProducts
}