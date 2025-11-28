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

        const neverOrderedProducts = await model.sequelize.query(
            `
                SELECT *
                FROM "Products" p
                LEFT JOIN "OrderDetails" d
                    ON p."id" = d."ProductID"
                WHERE d."id" IS NULL;
            `
        )

        const topThreeSelling = await model.sequelize.query(
            `
                SELECT 
                    p."id" as "ProductID",
                    p."ProductName",
                    SUM(d."Quantity") as "TotalQuantity"
                FROM "Products" p 
                JOIN "OrderDetails" d
                    ON p."id" = d."ProductID"
                GROUP BY p."id"
                ORDER BY "TotalQuantity" DESC
                LIMIT 3;
            `
        )

        const topProductSelling = await model.sequelize.query(
            `
                SELECT 
                    p."id" as "ProductID",
                    p."ProductName",
                    SUM(d."Quantity") as "totalTimesOrdered"
                FROM "OrderDetails" d
                JOIN "Products" p
                    ON p."id" = d."ProductID"
                GROUP BY p."id"
                HAVING SUM(d."Quantity") > 100;
            `
        )

        return res.json({
            products: filteredProducts,
            highestPriceProduct,
            neverOrderedProducts,
            topThreeSelling,
            topProductSelling,
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