const { sql } = require('kysely');
const { STATUS } = require("./Enums/Statuses");

const dbConnection = require("./DBConnection");
const logger = require("../Utility/Logger");

async function GetNews(status) {
    const DB = await dbConnection.getDB();

    if (!Object.values(STATUS).some(item => item.text === status)) {
        logger.LogWarn(`Invalid status: ${status}`, __filename);
        return null;
    }

    try {
        if (!DB) throw new Error("Database connection is not established.");

        const result = await DB
            .selectFrom("news")
            .where(sql`status = ${status}`)
            .selectAll()
            .execute();

        return result;
    } catch (ex) {
        logger.LogError(ex.message, ex.stack);
        return null;
    }
}

async function GetNewsById(id) {
    const DB = await dbConnection.getDB();

    try {
        if (!DB) throw new Error("Database connection is not established.");

        const result = await DB
            .selectFrom("news")
            .where("id", "=", id)
            .limit(1)
            .execute();

        return result;
    } catch (ex) {
        logger.LogError(ex.message, ex.stack);
        return null;
    }
}

// TODO - tests needed
async function GetNewsByTitle(title) {
    const DB = await dbConnection.getDB();

    try {
        if (!DB) throw new Error("Database connection is not established.");
        const value = title;

        const result = await DB
            .selectFrom("news")
            .where(sql`title = ${value}`)
            .limit(1)
            .execute();

        return result;
    } catch (ex) {
        logger.LogError(ex.message, ex.stack);
        return null;
    }
}

async function GetPendingNewsRecordByMessageId(id) {
    const DB = await dbConnection.getDB();

    try {
        if (!DB) throw new Error("Database connection is not established.");

        const result = await DB
            .selectFrom("pendingnews")
            .where("messageid", "=", id)
            .selectAll()
            .execute();

        return result;
    } catch (ex) {
        logger.LogError(ex.message, ex.stack);
        return null;
    }
}

async function GetPendingNewsRecordByNewsId(id) {
    const DB = await dbConnection.getDB();

    try {
        if (!DB) throw new Error("Database connection is not established.");

        const result = await DB
            .selectFrom("pendingnews")
            .where("newsid", "=", id)
            .selectAll()
            .execute();

        return result;
    } catch (ex) {
        logger.LogError(ex.message, ex.stack);
        return null;
    }
}

module.exports = { GetNews, GetNewsById, GetNewsByTitle, GetPendingNewsRecordByMessageId, GetPendingNewsRecordByNewsId };
