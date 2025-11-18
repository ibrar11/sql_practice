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
        return res.json({
            highSpending,
            mediumSpending,
            lowSpending,
            specificSpending,
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
            `Select * from "Customers"`
        );
        const customers = response[0];
        customers?.forEach(async (customer) => {
            const spending = parseInt(Math.floor(Math.random() * 1000) + 100);
            await models.sequelize.query(
                `UPDATE "Customers"
                    SET "Spending" = ${spending}
                    WHERE "id" = ${customer.id}
                `
            )
        })
        return res.json({
            status: "sucess"
        })
    } catch (err) {
        console.log("Error adding customers spendings", err)
        return res.json({
            status: "error",
            error: "cannotAddSpendings",
        });
    }
}

module.exports = {
    getCustomers,
    getDistinctCustomers,
    getFilteredCustomers,
    addSpending
}