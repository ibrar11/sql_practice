const models = require("../../../db/models/index");

const addEmployeesData = async(req, res) => {
    try {
        const { employees } = req.body;
        if (employees?.length === 0){
            return res.status(400).send({
                message: "Employees cannot be undefined"
            })
        }
        for (const employee of employees) {
            if (!(employee?.LastName && 
                employee?.FirstName &&
                employee?.BirthDate &&
                employee?.Photo &&
                employee?.Notes)
            ) {
                return res.status(400).send("Employee properties cannot be undefined")
            }
            await models.sequelize.query(
                `
                    INSERT INTO "Employees"
                    ("LastName","FirstName","BirthDate","Photo","Notes")
                    VALUES($1,$2,$3,$4,$5)
                `,{
                    bind: [
                        employee.LastName,
                        employee.FirstName,
                        employee.BirthDate,
                        employee.Photo,
                        employee.Notes,
                    ]
                }
            )
        }
        return res.status(200).send("success");
    } catch (err) {
        console.log("Error inserting employees data ",err);
        return res.status(500).send({
            message: err.message
        })
    }
}

module.exports = {
    addEmployeesData,
}