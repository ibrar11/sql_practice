const models = require("../../../db/models/index");

const addSupplierData =async (req, res) => {
    try {
        const { suppliers } = req.body;
        if (suppliers?.length === 0){
            return res.status(400).send({
                message: "Suppliers cannot be undefined"
            })
        }
        for (const supplier of suppliers) {
            if (!(supplier?.SupplierName && 
                supplier?.ContactName && 
                supplier?.Address && 
                supplier?.City && 
                supplier?.PostalCode && 
                supplier?.Country && 
                supplier?.Phone)
            ) {
                return res.status(400).send("Supplier properties cannot be undefined")
            }
            await models.sequelize.query(
                `
                    INSERT INTO "Suppliers"
                    ("SupplierName","ContactName","Address","City","PostalCode","Country","Phone")
                    VALUES($1,$2,$3,$4,$5,$6,$7)
                `,{
                    bind: [
                        supplier.SupplierName,
                        supplier.ContactName,
                        supplier.Address,
                        supplier.City,
                        supplier.PostalCode,
                        supplier.Country,
                        supplier.Phone,
                    ]
                }
            )
        }
        return res.status(200).send("success");
    } catch (err) {
        console.log("Error inserting suppliers data ",err);
        return res.status(500).send({
            message: err.message
        })
    }
}

module.exports = {
    addSupplierData,
}