const models = require('../../../db/models/index')

const addOrders = async (req, res) => {
    try {
        const { orders } = req.body;
        for (const order of orders) {
            if (!(order?.customerId 
                && order?.productId 
                && order?.orderDate 
                && order?.quantity)
            ) {
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

const addOrderDetails = async (req, res) => {
    try {
        const { orderDetails } = req.body;
        if (orderDetails?.length === 0){
            return res.status(400).send({
                message: "OrderDetails cannot be undefined"
            })
        }
        for (const detail of orderDetails) {
            if (!(detail?.OrderID && 
                detail?.ProductID && 
                detail?.Quantity)
            ) {
                return res.status(400).send("Detail properties cannot be undefined")
            }
            await models.sequelize.query(
                `
                    INSERT INTO "OrderDetails"
                    ("OrderID","ProductID","Quantity")
                    VALUES($1,$2,$3)
                `,{
                    bind: [
                        detail.OrderID,
                        detail.ProductID,
                        detail.Quantity
                    ]
                }
            )
        }
        return res.status(200).send("success");
    } catch (err) {
        console.log("Error inserting orderDetails data ",err);
        return res.status(500).send({
            message: err.message
        })
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await models.sequelize.query(
            `
                SELECT * FROM "Orders" INNER JOIN "Customers"
                ON "Orders"."CustomerID" = "Customers"."id"
            `
        )
        if(orders?.length === 0) {
            return res.status(404).send({
                messsage: "Orders not found."
            })
        }
        return res.status(200).send({
            orders
        })
    } catch (err) {
        console.log("Error getting orders ", err)
        return res.status(500).send({
            messsage: err.messsage,
        })
    }
}

module.exports = {
    addOrders,
    getOrders,
    addOrderDetails
}