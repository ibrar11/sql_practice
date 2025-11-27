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

        return res.json({
            highSpending,
            mediumSpending,
            lowSpending,
            specificSpending,
            topSpendingUsingSpending,
            topSpendingWithOutSpending,
            threeDistinctProducts,
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