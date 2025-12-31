const models = require('../../../db/models/index')
const sequelize = require('sequelize')

const getCustomers = async (req, res) => {
    try {
        const customers = await models.Customers.findAll();
        const response = await models.sequelize.query(
            'Select * from "Customers"'
        );
        if (customers?.length === 0) {
            throw new Error;
        }
        return res.json({
            customers,
            records: response?.[0],
            status: "sucess"
        })
    } catch (err) {
        console.log("Error fetching customers from db", err)
        return res.json({
            status: "error",
            error: "cannotFindCustomers",
        });
    }
}

const getDistinctCustomers = async (req, res) => {
    try {
        const distinctCustomers = await models.sequelize.query(
            `Select DISTINCT ("Country"), * from "Customers"`
        );
        if (distinctCustomers?.length === 0) {
            throw new Error;
        }
        const countryCountByGroup  = await models.sequelize.query(
            `Select COUNT("Country") AS countryCount, "Customers"."Country" 
                from "Customers"
                GROUP BY "Customers"."Country"
            `
        );
        return res.json({
            distinctCustomers,
            countryCountByGroup,
            status: "sucess"
        })
    } catch (err) {
        console.log("Error fetching distnict customers from db", err)
        return res.json({
            status: "error",
            error: "cannotFindDistnictCustomers",
        });
    }
}

const getFilteredCustomers = async (req, res) => {
    try {
        const highSpending = await models.sequelize.query(
            `Select * from "Customers"
                WHERE "Spending" > 1000
            `
        );
        const mediumSpending = await models.sequelize.query(
            `Select * from "Customers"
                WHERE "Spending" BETWEEN 500 AND 1000
            `
        );
        const lowSpending = await models.sequelize.query(
            `SELECT * from "Customers"
                WHERE "Spending" <= 500
            `
        )
        const specificSpending = await models.sequelize.query(
            `SELECT * from "Customers"
                WHERE "Spending" IN (200,400,600,800)
            `
        )

        const topSpendingUsingSpending = await models.sequelize.query(
            `
                SELECT DISTINCT ON ("Customers"."Country")
                    "Customers"."Country",
                    "Customers"."CustomerName",
                    "Customers"."Spending"
                FROM "Customers"
                ORDER BY "Customers"."Country","Customers"."Spending" DESC;
            `
        )

        const topSpendingWithOutSpending = await models.sequelize.query(
            `
                SELECT DISTINCT ON (c."Country")
                    c."Country",
                    c."CustomerName",
                    COALESCE(SUM(d."Quantity" * p."Price"),0) as "spending"
                FROM "Customers" c
                LEFT JOIN "Orders" o
                    ON c."id" = o."CustomerID"
                LEFT JOIN "OrderDetails" d
                    ON d."OrderID" = o."id"
                LEFT JOIN "Products" p
                    ON p."id" = d."ProductID"
                GROUP BY c."Country",c."CustomerName"
                ORDER BY c."Country", "spending" DESC;
            `
        )

        const threeDistinctProducts = await models.sequelize.query(
            `
                SELECT
                    c."id" as "CustomerID",
                    c."CustomerName",
                    COUNT(DISTINCT d."ProductID")
                FROM "Customers" c
                JOIN "Orders" o
                    ON c."id" = o."CustomerID"
                JOIN "OrderDetails" d
                    ON d."OrderID" = o."id"
                GROUP BY c."id"
                HAVING COUNT(DISTINCT d."ProductID") > 3
                ORDER BY c."id";
            `
        )

        const nonOrderCustomers = await models.sequelize.query(
            `
                SELECT c."id" AS "CustomerID"
                FROM "Customers" c 
                LEFT JOIN "Orders" o 
                    ON c."id" = o."CustomerID" 
                WHERE o."id" IS NULL;
            `
        )

        const specificCategoryCustomers = await models.sequelize.query(
            `
                SELECT 
                    c."id",
                    c."CustomerName"
                FROM "Customers" c
                JOIN "Orders" o
                    ON c."id" = o."CustomerID"
                JOIN "OrderDetails" d
                    ON o."id" = d."OrderID"
                JOIN "Products" p
                ON p."id" = d."ProductID"
                JOIN "Categories" ct
                ON ct."id" = p."CategoryId"
                WHERE ct."id" = 2
                GROUP BY c."id"
                HAVING COUNT(DISTINCT p."id") = (
                    SELECT
                        COUNT(p."id")
                    FROM "Products" p
                    WHERE p."CategoryId" = 2
                );
            `
        )

        const alwaysOrderOneCategory = await models.sequelize.query(
            `
                SELECT 
                    c."id",
                    c."CustomerName"
                FROM "Customers" c
                JOIN "Orders" o
                    ON c."id" = o."CustomerID"
                JOIN "OrderDetails" d
                    ON o."id" = d."OrderID"
                JOIN "Products" p
                ON p."id" = d."ProductID"
                GROUP BY c."id"
                HAVING COUNT(DISTINCT p."id") = COUNT(CASE WHEN p."CategoryId" = 2 THEN 1 END);
            `
        )

        const differentShippingCustomers = await models.sequelize.query(
            `
                SELECT
                    c."id" as "CustomerID", 
                    c."CustomerName", 
                    COUNT(DISTINCT os."shipCountry") 
                FROM "Customers" c 
                JOIN "Orders" o 
                    ON c."id" = o."CustomerID" 
                JOIN "OrderShippings" os 
                    ON o."id" = os."OrderID" 
                GROUP BY c."id" 
                HAVING COUNT(DISTINCT os."shipCountry") > 1;
            `
        )

        const top3SpendingCustomers = await models.sequelize.query(
            `
                SELECT 
                    c."id" as "CustomerID",
                    c."CustomerName",
                    SUM(t."TotalSpent") as "TotalSpent"
                FROM "Customers" c
                JOIN (SELECT 
                        c."id" as "CustomerID",
                        SUM(d."Quantity" * p."Price") as "TotalSpent"
                    FROM "Customers" c
                    JOIN "Orders" o
                        ON c."id" = o."CustomerID"
                    JOIN "OrderDetails" d
                        ON o."id" = d."OrderID"
                    JOIN "Products" p
                        ON p."id" = d."ProductID"
                    GROUP BY c."id",o."id"
                    Having COUNT(DISTINCT d."ProductID") > 3) t
                    ON c."id" = t."CustomerID"
                GROUP BY c."id"
                ORDER BY SUM(t."TotalSpent") DESC
                LIMIT 3;
            `
        )

        const top5BuyerWithDistinctCategory = await models.sequelize.query(
            `
                SELECT 
                    c."id" as "CustomerID",
                    c."CustomerName",
                    COUNT(DISTINCT p."CategoryId") as "DistinctCategoriesBought"
                FROM "Customers" c
                JOIN "Orders" o
                    ON o."CustomerID" = c."id"
                JOIN "OrderDetails" d
                    ON d."OrderID" = o."id"
                JOIN "Products" p
                    ON p."id" = d."ProductID"
                GROUP BY c."id"
                ORDER BY COUNT(DISTINCT p."CategoryId") DESC
                LIMIT 5;
            `
        )

        const havingTopAvgRevenuePerOrder = await models.sequelize.query(
            `
                SELECT 
                c."id" as "CustomerID",
                c."CustomerName",
                COUNT(t."OrderID") as "TotalOrders",
                SUM(t."orderRevenue")/COUNT(t."OrderID") as "AverageRevenuePerOrder"
                FROM "Customers" c
                JOIN (
                    SELECT
                        o."id" as "OrderID",
                        o."CustomerID",
                        SUM(d."Quantity" * p."Price") as "orderRevenue"
                    FROM "Orders" o
                    JOIN "OrderDetails" d
                        ON d."OrderID" = o."id"
                    JOIN "Products" p
                        ON p."id" = d."ProductID"
                    GROUP BY o."id"
                ) t
                    ON c."id" = t."CustomerID"
                GROUP BY c."id"
                HAVING COUNT(t."OrderID") >= 5
                ORDER BY SUM(t."orderRevenue")/COUNT(t."OrderID") DESC
                LIMIT 3;
            `
        )

        const topOrdersPerCustomers = await models.sequelize.query(
            `
                WITH order_rank as (
                    SELECT 
                        c."id" as "CustomerID",
                        c."CustomerName",
                        o."id" as "OrderID",
                        SUM(d."Quantity" * p."Price") as "OrderRevenue",
                        ROW_NUMBER() OVER (PARTITION BY c."id" ORDER BY  SUM(d."Quantity" * p."Price") DESC) as "OrderRank"
                    FROM "Customers" c
                    JOIN "Orders" o
                        ON c."id" = o."CustomerID"
                    JOIN "OrderDetails" d
                        ON o."id" = d."OrderID"
                    JOIN "Products" p
                        ON p."id" = d."ProductID"
                    GROUP BY c."id", o."id"
                )

                SELECT 
                    c."id" as "CustomerID",
                    c."CustomerName",
                    r."OrderID",
                    r."OrderRevenue",
                    r."OrderRank"
                FROM "Customers" c
                JOIN order_rank r
                    ON c."id" = r."CustomerID"
                WHERE r."OrderRank" <= 3
                ORDER BY c."id";
            `
        )

        const customersIncreasingSpendings = await models.sequelize.query(
            `
                WITH monthly_spending AS (
                    SELECT
                        c."id" AS "CustomerID",
                        c."CustomerName",
                        DATE_TRUNC('month', o."createdAt") AS "Month",
                        SUM(d."Quantity" * p."Price") AS "MonthlySpending"
                    FROM "Customers" c
                    JOIN "Orders" o
                        ON c."id" = o."CustomerID"
                    JOIN "OrderDetails" d
                        ON d."OrderID" = o."id"
                    JOIN "Products" p
                        ON p."id" = d."ProductID"
                    GROUP BY c."id", DATE_TRUNC('month', o."createdAt")
                ),

                spending_with_lag AS (
                    SELECT
                        *,
                        LAG("MonthlySpending") OVER (
                            PARTITION BY "CustomerID"
                            ORDER BY "Month"
                        ) AS "PreviousMonthSpending",
                        LAG("Month") OVER (
                            PARTITION BY "CustomerID"
                            ORDER BY "Month"
                        ) AS "PreviousMonth"
                    FROM monthly_spending
                ),

                validated_rows AS (
                    SELECT
                        *,
                        ("MonthlySpending" > "PreviousMonthSpending") AS is_increasing,
                        ("Month" = "PreviousMonth" + INTERVAL '1 month') AS is_consecutive
                    FROM spending_with_lag
                    WHERE "PreviousMonth" IS NOT NULL
                ),

                qualified_customers AS (
                    SELECT "CustomerID"
                    FROM validated_rows
                    GROUP BY "CustomerID"
                    HAVING
                        COUNT(*) >= 2
                        AND BOOL_AND(is_increasing)
                        AND BOOL_AND(is_consecutive)
                )

                SELECT
                    v."CustomerID",
                    v."CustomerName",
                    v."Month",
                    v."MonthlySpending",
                    v."PreviousMonthSpending",
                    v."MonthlySpending" - v."PreviousMonthSpending" AS "GrowthAmount"
                FROM validated_rows v
                JOIN qualified_customers q
                    ON v."CustomerID" = q."CustomerID"
                ORDER BY v."CustomerID", v."Month";
            `
        )

        const customersIncreasingSpendings2 = await models.sequelize.query(
            `
                WITH monthly_spending AS (
                    SELECT
                        c."id" AS "CustomerID",
                        c."CustomerName",
                        DATE_TRUNC('month', o."createdAt") AS "Month",
                        SUM(d."Quantity" * p."Price") AS "MonthlySpending"
                    FROM "Customers" c
                    JOIN "Orders" o
                        ON c."id" = o."CustomerID"
                    JOIN "OrderDetails" d
                        ON d."OrderID" = o."id"
                    JOIN "Products" p
                        ON p."id" = d."ProductID"
                    GROUP BY c."id",  DATE_TRUNC('month', o."createdAt")
                ),
                ranked_months AS (
                    SELECT
                        *,
                        ROW_NUMBER() OVER (
                            PARTITION BY "CustomerID"
                            ORDER BY "Month"
                        ) AS "MonthRank"
                    FROM monthly_spending
                ),
                growth AS (
                    SELECT
                        curr."CustomerID",
                        curr."CustomerName",
                        curr."Month" AS "CurrentMonth",
                        prev."Month" AS "PreviousMonth",
                        curr."MonthlySpending" AS "CurrentSpending",
                        prev."MonthlySpending" AS "PreviousSpending",
                        curr."MonthlySpending" - prev."MonthlySpending" AS "GrowthAmount",
                        (curr."MonthlySpending" > prev."MonthlySpending") AS "is_increasing",
                        (curr."Month" = prev."Month" + INTERVAL '1 month') AS "is_consecutive"
                    FROM ranked_months curr
                    JOIN ranked_months prev
                        ON curr."CustomerID" = prev."CustomerID"
                    AND curr."MonthRank" = prev."MonthRank" + 1
                ),
                eligible_customers AS (
                    SELECT "CustomerID"
                    FROM growth
                    GROUP BY "CustomerID"
                    HAVING 
                        COUNT(*) >= 2
                        AND BOOL_AND(is_increasing)
                        AND BOOL_AND(is_consecutive)
                )


                SELECT *
                FROM growth g
                JOIN eligible_customers e
                    ON g."CustomerID" = e."CustomerID"
                ORDER BY g."CustomerID", "CurrentMonth";
            `
        )

        const customerCCRRanking = await models.sequelize.query(
            `
                WITH eligible_customers as (
                    SELECT 
                        c."id" as "CustomerID"
                    FROM "Customers" c
                    JOIN "Orders" o
                        ON c."id" = o."CustomerID"
                    JOIN "OrderDetails" d
                        ON o."id" = d."OrderID"
                    JOIN "Products" p
                        ON p."id" = d."ProductID"
                    GROUP BY c."id"
                    HAVING COUNT(DISTINCT p."CategoryId") >= 3
                )
            `
        )

        return res.json({
            highSpending,
            mediumSpending,
            lowSpending,
            specificSpending,
            topSpendingUsingSpending,
            topSpendingWithOutSpending,
            threeDistinctProducts,
            nonOrderCustomers,
            specificCategoryCustomers,
            alwaysOrderOneCategory,
            differentShippingCustomers,
            top3SpendingCustomers,
            top5BuyerWithDistinctCategory,
            havingTopAvgRevenuePerOrder,
            topOrdersPerCustomers,
            customersIncreasingSpendings,
            customersIncreasingSpendings2,
            status: "sucess"
        })
    } catch (err) {
        console.log("Error fetching filtered customers from db", err)
        return res.json({
            status: "error",
            error: "cannotFindFilteredCustomers",
        });
    }
}

const addSpending = async (req, res) => {
    try {
        const response = await models.sequelize.query(
            `
                SELECT 
                    "Customers"."id" as "CustomerID", 
                    "Customers"."CustomerName", 
                    SUM("OrderDetails"."Quantity" * "Products"."Price") as "Spending"
                FROM "Customers" 
                LEFT JOIN "Orders" 
                    ON "Customers"."id" = "Orders"."CustomerID"
                LEFT JOIN "OrderDetails" 
                    ON "Orders"."id" = "OrderDetails"."OrderID" 
                LEFT JOIN "Products" 
                    ON "OrderDetails"."ProductID" = "Products"."id"
                GROUP BY "Customers"."id"
                ORDER BY "Customers"."id";
            `
        );
        const customers = response[0];
        for (const customer of customers) {
            await models.sequelize.query(
                `UPDATE "Customers"
                    SET "Spending" = ${customer?.Spending ? customer.Spending : 0}
                    WHERE "id" = ${customer.CustomerID}
                `
            )
        }
        return res.json({
            customers,
            status: "sucess"
        })
    } catch (err) {
        console.log("Error adding customers spendings", err)
        return res.status(500).send({
            message: err.message
        })
    }
}

module.exports = {
    getCustomers,
    getDistinctCustomers,
    getFilteredCustomers,
    addSpending
}