const models = require('../../../db/models/index')

const addShippingDetails = async (req, res) => {
    try {
        const { orderShippings } = req.body;
        if (orderShippings?.length === 0){
            return res.status(400).send({
                message: "OrderShippings cannot be undefined"
            })
        }
        for (const orderShipping of orderShippings) {
            if (!(orderShipping?.orderID &&  
                orderShipping?.shipCountry)
            ) {
                return res.status(400).send("OrderShipping properties cannot be undefined")
            }
            await models.sequelize.query(
                `
                    INSERT INTO "OrderShippings"
                    ("OrderID","shipCountry")
                    VALUES($1,$2)
                `,{
                    bind: [
                        orderShipping.orderID,
                        orderShipping.shipCountry,
                    ]
                }
            )
        }
        return res.status(200).send("success");
    } catch (err) {
        console.log("Error inserting orderShippings data ",err);
        return res.status(500).send({
            message: err.message
        })
    }
}

module.exports = {
    addShippingDetails
}