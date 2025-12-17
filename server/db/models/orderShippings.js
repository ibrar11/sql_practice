module.exports = (sequelize, DataTypes) => {
    var OrderShippings = sequelize.define("OrderShippings", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        OrderID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        shipCountry: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    })

    OrderShippings.associates = (models) => {
        OrderShippings.belongsTo(models.Orders)
    }

    return OrderShippings;
}