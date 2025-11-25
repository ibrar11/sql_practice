
module.exports = (sequelize, DataTypes) => {

    var Orders = sequelize.define("Orders", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        CustomerID: {
            type: DataTypes.INTEGER,
            references: {
                model: "Customers",
                key: "id"
            },
            allowNull: false
        },
        EmployeeID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        OrderDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        ShipperID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    Orders.associate = function (models) {
        Orders.belongsTo(models.Customers)
        Orders.belongsTo(models.Shippers)
        Orders.belongsTo(models.Employees)
        Orders.hasMany(models.OrderDetails)
    }

    return Orders;
}