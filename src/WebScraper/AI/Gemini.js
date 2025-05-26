const { GoogleGenerativeAI } = require("@google/generative-ai");

const logger = require("../../Features/Utility/Logger");
const { gemini_API_KEY } = require("../../config");

const GEN_AI = new GoogleGenerativeAI(gemini_API_KEY);

async function AskGeminiForPickNews(newsList) {
    try {
        const _NEWS_TITLES = await GetNewsTitles(newsList);

        if (_NEWS_TITLES?.length === 0) throw new Error("No news titles found.");

        const MODEL = GEN_AI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const PROMPT = `Review the following news titles ${_NEWS_TITLES} and select the ones that are most interesting for IT/Technology people, then output the indexes of the interesting ones write only numbers separated by commas.`;

        const RESULT = await MODEL.generateContent(PROMPT);
        const RESPONSE = RESULT.response;
        const TEXT = RESPONSE.text();

        return TEXT;
    }catch (ex) {
        logger.LogError(ex.message, ex.stack);
        return null;
    }
}

// TODO - test needed

async function GetNewsTitles(_newsList){
    let newsTitles = [];

    _newsList.forEach(_news => {
        newsTitles.push(_news.title);
    });

    return newsTitles;
}

async function GetIntrestingNews(newsList){
    let interestingNewsList = [];

    try {
        let _response = await AskGeminiForPickNews(newsList)
        for(let _id in _response.split(',')) {
            interestingNewsList.push(newsList[_id]);
        };

        return interestingNewsList;
    } catch (ex) {
        logger.LogError(ex.message, ex.stack);
        return null;
    }

}



module.exports = { GetIntrestingNews }