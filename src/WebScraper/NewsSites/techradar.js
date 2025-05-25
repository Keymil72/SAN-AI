const axios = require('axios');
const cheerio = require('cheerio');

const logger = require('../../Features/Utility/Logger');
const inserter = require('../../Features/Database/Inserter');
const urlValidator = require('../../Features/Utility/UrlValidator');
const newsBuilder = require('../Utility/NewsBuilder');

const _BASE_URL = 'https://www.techradar.com/computing/software/artificial-intelligence';

// TODO - tests needed -- 0 news inserted to DB
async function GetNews(_url = _BASE_URL) {
    logger.LogInfo('Trying to get news from techradar...');

    try {
        let newsList = [];
        const RESPONSE = await axios(_url);
        let _finalUrl = RESPONSE.request.res ? RESPONSE.request.res.responseUrl : RESPONSE.request.responseURL;
        const _HTML = RESPONSE.data;
        let _content = cheerio.load(_HTML);

        const tasks = [];

        _content('.listingResultsWrapper', _HTML)
            .first()
            .find('.listingResult')
            .each( async function (i) {
            const task = (async () => {
                if (_content(this).find('.listingResults')) {
                    let _title = _content(this).find('.article-name').text();

                    if (_title.length < 1)
                        return;

                    let _link = _content(this).find('a').attr('href');
                    let _description = _content(this).find('.synopsis').text();

                    _link = await urlValidator.isUrlValid(_link) ? _link : _url;

                    const news = new newsBuilder.NewsBuilder()
                        .setTitle(_title)
                        .setDescription(_description)
                        .setTargetSite(_link)
                        .setFromSite(_url)
                        .setDirectLink(_finalUrl)
                        .build();

                   newsList.push(news);

                }
            })();
            tasks.push(task);
        });

        await Promise.all(tasks);
        await inserter.InserNewsFromList(newsList);

        logger.LogInfo(`${newsList.length} news from techradar inserted to DB.`);
        return true;
    }catch (ex){
        logger.LogError(ex.message, ex.stack);
        return false;
    }
}

async function GetAllNews(){
    let _counter = 1;
    let url = 'https://www.techradar.com/computing/software/artificial-intelligence/page/';
    logger.LogInfo('Starting to get all news from techradar...');
    await GetNews();

    logger.LogInfo('Getting news from techradar page 1...');
    _counter += 1;

    try {
        for (_counter; _counter < 10; _counter++) {
            if (await GetNews(url + _counter) === false) {
                logger.LogWarn(`No news found on page ${_counter}.`);
            }else {
                logger.LogInfo(`News from page ${_counter} inserted to DB.`);
            }
        }
        return true;
    }catch (ex) {
        logger.LogError(ex.message, ex.stack);
        return false;
    }

}

module.exports = { GetNews, GetAllNews };