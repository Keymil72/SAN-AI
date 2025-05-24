const bleepingcomputer = require("../NewsSites/bleepingcomputer");
const unKnowNews = require("../NewsSites/unKnowNews");
const logger = require("../../Features/Utility/Logger");

async function Get(){
    try {
        //if (await bleepingcomputer.GetNews() == null) throw new Error("BleepingComputer news is null.");
        if (await unKnowNews.GetNews() == null) throw new Error("UnknownNews news is null.");

        return true;
    } catch (ex) {
        logger.LogError(ex.message, ex.stack);
        return false;
    }
}

module.exports = { Get };