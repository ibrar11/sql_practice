const models = require("../../../db/models/index")

const addCategoriesData = async (req,res) => {
    try {
        const { categories } = req.body;
        if (categories?.length === 0){
            return res.status(400).send({
                message: "Categories cannot be undefined"
            })
        }
        for (const category of categories) {
            if (!category?.CategoryName || !category?.Description) {
                return res.status(400).send("Category properties cannot be undefined")
            }
            await models.sequelize.query(
                `
                    INSERT INTO "Categories"
                    ("CategoryName","Description")
                    VALUES($1,$2)
                `,{
                    bind: [
                        category.CategoryName,
                        category.Description
                    ]
                }
            )
        }
        return res.status(200).send("success");
    } catch (err) {
        console.log("Error inserting categories data ",err);
        return res.status(500).send({
            message: err.message
        })
    }
}

module.exports = {
    addCategoriesData
}