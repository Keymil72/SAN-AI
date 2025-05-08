const dbConnection = require("./DBConnection");
const logger = require("../Utility/Logger");
const getter = require("./Getter");

// TODO - tests needed
async function InserNews(news) {
    const DB = await dbConnection.getDB();

    try {
        if (!DB) throw new Error("Database connection is not established.");
        if (await IsNewsExists(news.title)) throw new Error("News already exists.");

        const result = await DB
            .insertInto('news')
            .values({
                title: news.title,
                link: news.link,
                description: news.description,
                source: news.source
            })
            .executeTakeFirst()

        return result;
    }catch (ex) {
        logger.LogError(ex.message, ex.stack);
    }
}

// TODO - tests needed and remove "'" from title and description with getter posibility, _notExistingNews == 0
async function InserNewsFromList(newsList) {
    const DB = await dbConnection.getDB();

    try {
        let _notExistingNews = [];

        if (!DB) throw new Error("Database connection is not established.");

        newsList.forEach(async (news) => {
            if (await IsNewsExists(news.title)) {
                logger.LogWarn(`News already exists: ${news.title}`, __filename);
            } else {
                _notExistingNews.push(news);
            }
        });

        const result = await DB
            .insertInto('news')
            .values(_notExistingNews)
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

// TODO - tests needed
async function IsNewsExists(title) {
    getter.GetNewsByTitle(title).then((result) => {
        return result;
    }).catch((ex) => {
        logger.LogError(ex.message, ex.stack);
    });
}

module.exports = { InserNews, InserNewsFromList, InsertRecordToPendingNewsTable };