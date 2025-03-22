const { STATUS } = require("../Database/Enums/Statuses");

const dbConnection = require("./DBConnection");
const logger = require("../Utility/Logger");

async function UpdateNewsStatusById(id, status) {
    const DB = await dbConnection.getDB();

    if (!Object.values(STATUS).some(item => item.text == status))
        logger.Warn(`Invalid status: ${status}`, __filename);

    try {
        if (!DB) throw new Error("Database connection is not established.");

        const result = await DB
            .updateTable("news")
            .set("status", status)
            .where("id", "=", id)
            .execute();

        return result;
    } catch (ex) {
        logger.Error(ex.message, ex.stack);
        return null;
    }
}

module.exports = { UpdateNewsStatusById };