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

module.exports = {
    getCustomers,
    getDistinctCustomers,
}