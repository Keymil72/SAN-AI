const { GoogleGenerativeAI } = require("@google/generative-ai");

const logger = require("../../Features/Utility/Logger");
const { gemini_API_KEY } = require("../../config");

const GEN_AI = new GoogleGenerativeAI(gemini_API_KEY);

async function AskGeminiForPickNews(newsList) {
    try {
        const _NEWS_TITLES = GetNewsTitles(newsList);

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

function GetNewsTitles(newsList){
    let newsTitles = [];

    newsList?.each((news) => {
        newsTitles.push(news.title);
    });

    return newsTitles;
}

async function GetIntrestingNews(newsList){
    let interestingNewsList = [];

    AskGeminiForPickNews(newsList).then((response) => {
        let _ids = response.split(',');

        _ids.each((id) => {
            interestingNewsList.push(newsList[id]);
        });

        return interestingNewsList;
    }).catch((ex) => {
        logger.LogError(ex.message, ex.stack);
    });


}



module.exports = { GetIntrestingNews }