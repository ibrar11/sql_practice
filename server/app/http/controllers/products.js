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

        const productRevenueByCategory = await model.sequelize.query(
            `
                SELECT 
                    c."id", 
                    SUM(d."Quantity" * p."Price") as "totalRevenue" 
                FROM "Categories" c
                JOIN "Products" p 
                    ON c."id" = p."CategoryId" 
                JOIN "OrderDetails" d 
                    ON d."ProductID" = p."id" 
                GROUP BY c."id";
            `
        )

        const expensiveProductCategoryWise = await model.sequelize.query(
            `
                SELECT 
                    c."id",
                    p."ProductName",
                    p."Price"
                FROM "Categories" c
                JOIN "Products" p
                    ON p."CategoryId" = c."id"
                WHERE p.id = (
                    SELECT 
                        "id"
                    FROM "Products"
                    WHERE "CategoryId" = c."id"
                    ORDER BY "Price" DESC
                    LIMIT 1
                )
                ORDER BY c."id";
            `
        )

        const categoryWise2 = await model.sequelize.query(
            `
                SELECT DISTINCT ON (c."id")
                    c."CategoryName",
                    p."ProductName",
                    p."Price"
                FROM "Categories" c
                JOIN "Products" p
                    ON p."CategoryId" = c."id"
                ORDER BY c."id", p."Price" DESC;
            `
        )

        const categoryWise3 = await model.sequelize.query(
            `
                with max_priced AS (
                    SELECT 
                        p."CategoryId",
                        p."ProductName",
                        p."Price",
                        ROW_NUMBER() OVER (PARTITION BY p."CategoryId" ORDER BY p."Price" DESC) as rn
                    FROM "Products" p
                )
                SELECT 
                    c."id",
                    c."CategoryName",
                    t."ProductName",
                    t."Price"
                FROM "Categories" c
                JOIN max_priced t
                    ON t."CategoryId" = c."id"
                WHERE t.rn = 1;
            `
        )

        const categoryWise4 = await model.sequelize.query(
            `
                SELECT 
                    c."CategoryName",
                    p."ProductName",
                    p."Price"
                FROM "Categories" c
                JOIN "Products" p
                    ON c."id" = p."CategoryId"
                JOIN (
                    SELECT "CategoryId", MAX("Price") AS max_price
                    FROM "Products"
                    GROUP BY "CategoryId"
                ) t
                    ON p."CategoryId" = t."CategoryId"
                AND p."Price" = t.max_price;
            `
        )

        return res.json({
            products: filteredProducts,
            highestPriceProduct,
            neverOrderedProducts,
            topThreeSelling,
            topProductSelling,
            productRevenueByCategory,
            expensiveProductCategoryWise,
            categoryWise2,
            categoryWise3,
            categoryWise4,
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