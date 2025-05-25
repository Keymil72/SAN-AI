const bleepingComputer = require("../NewsSites/BleepingComputer");
const unKnowNews = require("../NewsSites/UnKnowNews");
const techRadar = require("../NewsSites/TechRadar");
const logger = require("../../Features/Utility/Logger");
const news = require("../../Features/News/NewNews");

async function Get(){
    try {
        if (!await bleepingComputer.GetNews()) throw new Error("BleepingComputer news is null.");
        if (!await techRadar.GetAllNews()) throw new Error("TechRadar news is null.");
        if (!await unKnowNews.GetNews()) throw new Error("UnknownNews news is null.");

        logger.LogInfo("News successfully fetched and inserted into the database.");
        return true;
    } catch (ex) {
        logger.LogError(ex.message, ex.stack);
        return false;
    }
}

async function Send() {
    await news.Send();
    await news.UpdateToPending();
    logger.LogInfo("Pending news sent to the acceptance channel.");
}

module.exports = { Get, Send };