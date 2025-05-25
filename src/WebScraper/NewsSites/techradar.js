const axios = require('axios');
const cheerio = require('cheerio');

const logger = require('../../Features/Utility/Logger');
const inserter = require('../../Features/Database/Inserter');
const urlValidator = require('../../Features/Utility/UrlValidator');
const newsBuilder = require('../Utility/NewsBuilder');

const url = 'https://www.techradar.com/computing/software/artificial-intelligence';

// TODO - tests needed
async function GetNews(){
    logger.LogInfo('Trying to get news from techradar...');

    try {
        let newsList = [];
        const RESPONSE = await axios(url);
        let _finalUrl = RESPONSE.request.res ? RESPONSE.request.res.responseUrl : RESPONSE.request.responseURL;
        const _HTML = RESPONSE.data;
        let _content = cheerio.load(_HTML);

        const tasks = [];

        _content('.listingResultsWrapper', _HTML)
            .first()
            .find('li')
            .each( async function (i) {

            const task = (async () => {
                if (_content(this).find('.listingResults')) {
                    let _title = _content(this).find('.content').find('header').find('h3').text();

                    if (_title.length < 1)
                        return;

                    let _link = _content(this).find('a').attr('href');
                    let _description = _content(this).find('.content').find('header').find('.synopsis').text();

                    _link = await urlValidator.isUrlValid(_link) ? _link : url;

                    const news = new newsBuilder.NewsBuilder()
                        .setTitle(_title)
                        .setDescription(_description)
                        .setTargetSite(_link)
                        .setFromSite(url)
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

module.exports = { GetNews };