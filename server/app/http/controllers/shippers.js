const models = require("../../../db/models/index");

const addShipperData = async (req, res) => {
    try {
        const { shippers } = req.body;
        if (shippers?.length === 0){
            return res.status(400).send({
                message: "Shippers cannot be undefined"
            })
        }
        for (const shipper of shippers) {
            if (!(shipper?.ShipperName && 
                shipper?.Phone)
            ) {
                return res.status(400).send("Shipper properties cannot be undefined")
            }
            await models.sequelize.query(
                `
                    INSERT INTO "Shippers"
                    ("ShipperName","Phone")
                    VALUES($1,$2)
                `,{
                    bind: [
                        shipper.ShipperName,
                        shipper.Phone,
                    ]
                }
            )
        }
        return res.status(200).send("success");
    } catch (err) {
        console.log("Error inserting shippers data ",err);
        return res.status(500).send({
            message: err.message
        })
    }
}

module.exports = {
    addShipperData,
}