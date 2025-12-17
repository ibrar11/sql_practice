module.exports = (sequelize, DataTypes) => {
    var Suppliers = sequelize.define("Suppliers", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        SupplierName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ContactName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        City: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        PostalCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Phone: {
            type: DataTypes.STRING,
            allowNull: false,
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

    Suppliers.associate = function (models) {
        Suppliers.hasMany(models.Products);
    }

    return Suppliers;
}