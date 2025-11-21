const addOrders = async (req, res) => {
    try {

    } catch (err) {
        console.log("Error inserting orders ", err)
        return res.json({
            messsage: err.messsage,
            status: 'error'
        })
    }
}

module.exports = {
    addOrders
}