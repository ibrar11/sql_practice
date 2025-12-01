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

const filteredEmployeesData = async(req, res) => {
    try {

        const nonOrderCustomers = await models.sequelize.query(
            `
                SELECT e."id" AS "EmployeeID"
                FROM "Employees" e
                LEFT JOIN "Orders" o 
                    ON e."id" = o."EmployeeID" 
                WHERE o."id" IS NULL;
            `
        )

        const topThreeActiveEmployees = await models.sequelize.query(
            `
                SELECT 
                    e."id" as "EmployeeID", 
                    e."FirstName", 
                    e."LastName", 
                    COUNT(o."id") as "ordersHandled" 
                FROM "Employees" e 
                JOIN "Orders" o 
                    ON e."id" = o."EmployeeID" 
                GROUP BY e."id" 
                ORDER BY COUNT(o."id") DESC 
                LIMIT 3;
            `
        )

        return res.json({
            nonOrderCustomers,
            topThreeActiveEmployees,
            status: "sucess"
        })
    } catch (err) {
        console.log("Error fetching filtered employee from db", err)
        return res.json({
            status: "error",
            error: "cannotFindFilteredEmployees",
        });
    }
}

module.exports = {
    addEmployeesData,
    filteredEmployeesData
}