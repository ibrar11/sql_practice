const models = require("../../../db/models/index")

const addCategoriesData = async (req,res) => {
    try {
        const { categories } = req.body;
        if (categories?.length === 0){
            return res.status(400).send({
                message: "Categories cannot be undefined"
            })
        }
        for (const category of categories) {
            if (!(category?.CategoryName && category?.Description)) {
                return res.status(400).send("Category properties cannot be undefined")
            }
            await models.sequelize.query(
                `
                    INSERT INTO "Categories"
                    ("CategoryName","Description")
                    VALUES($1,$2)
                `,{
                    bind: [
                        category.CategoryName,
                        category.Description
                    ]
                }
            )
        }
        return res.status(200).send("success");
    } catch (err) {
        console.log("Error inserting categories data ",err);
        return res.status(500).send({
            message: err.message
        })
    }
}

const getCategoriesData = async (req,res) => {
    try {
        const withTopProductPercentage = await models.sequelize.query(
            `
                SELECT DISTINCT ON (c."id")
                c."id" as "CategoryID",
                c."CategoryName",
                p."id" as ProductID,
                p."ProductName",
                SUM(d."Quantity" * p."Price") as "ProductRevenue",
                SUM(d."Quantity" * p."Price")/t."CategoryTotalRevenue" * 100 as "ContributionPercent"
                FROM "Categories" c
                JOIN "Products" p
                    ON c."id" = p."CategoryId"
                JOIN "OrderDetails" d
                    ON p."id" = d."ProductID"
                JOIN (
                    SELECT 
                        c."id" as "CategoryID",
                        SUM(d."Quantity" * p."Price") as "CategoryTotalRevenue"
                    FROM "Categories" c
                    JOIN "Products" p
                        ON c."id" = p."CategoryId"
                    JOIN "OrderDetails" d
                        ON p."id" = d."ProductID"
                    GROUP BY c."id"
                ) t
                    ON c."id" = t."CategoryID"
                GROUP BY c."id",p."id",t."CategoryTotalRevenue"
                ORDER BY c."id", SUM(d."Quantity" * p."Price") DESC;
            `
        )

        const revenueUsingGroupingSets = await models.sequelize.query(
            `
                SELECT
                    p."CategoryId",
                    p."SupplierId",
                    SUM(d."Quantity" * p."Price") AS "TotalRevenue"
                FROM "Products" p
                JOIN "OrderDetails" d
                    ON d."ProductID" = p."id"
                GROUP BY GROUPING SETS (
                    (p."CategoryId", p."SupplierId"),   -- Category + Supplier
                    (p."CategoryId"),                   -- Category only
                    (p."SupplierId"),                   -- Supplier only
                    ()                                  -- Grand total (optional)
                )
                ORDER BY 
                    p."CategoryId" NULLS LAST,
                    p."SupplierId" NULLS LAST;
            `
        )

        return res.status(200).send({
            withTopProductPercentage,
            revenueUsingGroupingSets
        });
    } catch (err) {
        console.log("Error fetching categories data ",err);
        return res.status(500).send({
            message: err.message
        })
    }
}

module.exports = {
    addCategoriesData,
    getCategoriesData
}