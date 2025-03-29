const dbConnection = require("./DBConnection");
const logger = require("../Utility/Logger");

// TODO - tests needed
async function InserNews(news) {
    const DB = await dbConnection.getDB();

    try {
    if (!DB) throw new Error("Database connection is not established.");

    const result = await DB
        .insertInto('news')
        .values({
            title: news.title,
            link: news.link,
            description: news.description,
            date: news.date,
            source: news.source
        })
        .executeTakeFirst()

        return result;
    }catch (ex) {
        logger.LogError(ex.message, ex.stack);
    }
}

// TODO - tests needed
async function InserNewsFromList(newsList) {
    const DB = await dbConnection.getDB();

    try {
        if (!DB) throw new Error("Database connection is not established.");

        const result = await DB
            .insertInto('news')
            .values(newsList)
            .executeTakeFirst()

        return result;
    } catch (ex) {
        logger.LogError(ex.message, ex.stack);
    }
}

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
        logger.LogError(ex.message, ex.stack);
    }
}

module.exports = { InserNews, InserNewsFromList, InsertRecordToPendingNewsTable };