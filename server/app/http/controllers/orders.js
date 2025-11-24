const models = require('../../../db/models/index')

const addOrders = async (req, res) => {
    try {
        const { orders } = req.body;
        for (const order of orders) {
            if (order?.customerId && order?.productId && order?.orderDate && order?.quantity) {
                return res.status(400).send("Order properties cannot be undefined")
            }
            await models.sequelize.query(
                `INSERT INTO "Orders"
                    ("CustomerID", "EmployeeID", "OrderDate", "ShipperID")
                    VALUES($1, $2, $3, $4)
                `,{
                    bind: [
                        order.customerId,
                        order.productId,
                        new Date(order.orderDate),
                        order.quantity,
                    ],
                }
            )
        }
        return res.status(200).send({
            orders
        })
    } catch (err) {
        console.log("Error inserting orders ", err)
        return res.status(500).send({
            messsage: err.messsage,
        })
    }
}

module.exports = {
    addOrders
}