
module.exports = (sequelize, DataTypes) => {

    var OrderDetails = sequelize.define("OrderDetails", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        OrderID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ProductID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    OrderDetails.associate = function (models) {
        OrderDetails.belongsTo(models.Products)
        OrderDetails.belongsTo(models.Orders)
    }

    return OrderDetails;
}