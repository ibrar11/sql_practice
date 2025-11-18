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
                type: DataType.INTEGER,
                defaultValue: 0
            }
        }
    )

    return Products;
}