module.exports = (sequelize, DataType) => {

    var Products = sequelize.define("Products",
        {
            id: {
                type: DataType.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            productName: {
                type: DataType.STRING
            },
            supplierId: {
                type: DataType.INTEGER
            },
            categoryId: {
                type: DataType.INTEGER
            },
            Unit: {
                type: DataType.STRING
            },
            Price: {
                type: DataType.FLOAT,
                defaultValue: 0
            }
        }
    )

    Products.associate = function(models) {
        Products.belongsTo(models.Categories)
        Products.belongsTo(models.Suppliers)
    }

    return Products;
}