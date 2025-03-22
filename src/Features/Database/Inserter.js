const { STATUS } = require("../Database/Enums/Statuses");

const dbConnection = require("./DBConnection");
const logger = require("../Utility/Logger");

async function InsertRecordToPendingNewsTable(messageId, newsId) {
    const DB = await dbConnection.getDB();

    try {
        if (!DB) throw new Error("Database connection is not established.");

        const result = await DB
            .insertInto('pendingnews')
            .values({
                messageid: messageId,
                newsid: newsId
            })
            .executeTakeFirst()

        return result;
    } catch (ex) {
        logger.Error(ex.message, ex.stack);
        return null;
    }
}

module.exports = { InsertRecordToPendingNewsTable };