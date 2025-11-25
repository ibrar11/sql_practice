module.exports = (sequelize, DataTypes) => {
    var Shippers = sequelize.define("Shippers", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        ShipperName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    Shippers.associate = function (models) {
        Shippers.hasMany(models.Orders);
    }

    return Shippers;
}