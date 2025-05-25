const dbConnection = require("./DBConnection");
const logger = require("../Utility/Logger");
const getter = require("./Getter");

async function InserNews(news) {
    const DB = await dbConnection.getDB();

    try {
        if (!DB) throw new Error("Database connection is not established.");
        if (await IsNewsExists(news.title)) throw new Error("News already exists.");

        const result = await DB
            .insertInto('news')
            .values(news)
            .executeTakeFirst()

        return result;
    }catch (ex) {
        logger.LogError(ex.message, ex.stack);
    }
}

async function InserNewsFromList(newsList) {
    const DB = await dbConnection.getDB();

    try {
        let _notExistingNews = [];

        if (!DB) throw new Error("Database connection is not established.");

        for(const news of newsList){
            if (!await IsNewsExists(news.title)) {
                _notExistingNews.push(news);
            }
        }

        if (_notExistingNews.length > 0) {
            const result = await DB
                .insertInto('news')
                .values(_notExistingNews)
                .executeTakeFirst()

            return result == undefined;
        }

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

async function IsNewsExists(title) {
    try{
        const result = await getter.GetNewsByTitle(title);
        return result[0]?.id != undefined;
    }catch(ex) {
        logger.LogError(ex.message, ex.stack);
        return false;
    };
}

module.exports = { InserNews, InserNewsFromList, InsertRecordToPendingNewsTable };