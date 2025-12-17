
module.exports = (sequelize, DataTypes) => {
    var Categories = sequelize.define("Categories", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            aloowNull: false,
            primaryKey: true
        },
        CategoryName: {
            type: DataTypes.STRING,
            aloowNull: false
        },
        Description: {
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

    Categories.associate = function(models) {
        Categories.hasMany(models.Products)
    }

    return Categories;
}