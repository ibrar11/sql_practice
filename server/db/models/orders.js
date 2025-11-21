
module.exports = (sequelize, DataTypes) => {

    var Orders = sequelize.define("Orders", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        CustomerID: {
            type: Sequelize.INTEGER,
            references: {
                model: "Customers",
                key: "id"
            },
            allowNull: false
        },
        EmployeeID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        OrderDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        ShipperID: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    Orders.associate = function (models) {
        Orders.belongsTo(models.Customers)
    }

    return Orders;
}