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
            records: response?.data,
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

module.exports = {
    getCustomers,
}