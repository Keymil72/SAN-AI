const axios = require('axios');
const cheerio = require('cheerio');

const logger = require('../../Features/Utility/Logger');
const inserter = require('../../Features/Database/Inserter');
const urlValidator = require('../../Features/Utility/UrlValidator');
const newsBuilder = require('../Utility/NewsBuilder');

const url = 'https://unknow.news/last';

// TODO - tests needed
async function GetNews() {
    logger.LogInfo('Trying to get news from unKnowNews...');

    try {
        const newsList = [];
        const response = await axios(url);
        const _html = response.data;
        let _content = cheerio.load(_html);

        const tasks = [];

        _content('ol')
            .first()
            .find('li')
            .each(function () {

            const task = (async () => {
                if (_content(this).find('strong').text() !== '') {
                    const _title = _content(this).find('strong').text().replace(/'/g, "''").replace(/"/g, "");

                    let _link = _content(this).find('a').attr('href');
                    let _description = _content(this).find('span').text().replace(/'/g, "''").replace(/"/g, "");

                    _description = _description.slice(_description.indexOf('INFO: ') + 6);
                    _link = await urlValidator.isUrlValid(_link) ? _link : url;

                    const news = new newsBuilder.NewsBuilder()
                        .setTitle(_title)
                        .setDescription(_description)
                        .setTargetSite(_link)
                        .setFromSite(url)
                        // TODO - add direct link to news like "https://mrugalski.pl/nl/wu/qZJ892FLFsTwGv892JkcLw8QZA"
                        .setDirectLink(_link)
                        .build();

                    newsList.push(news);
                }
            })();
            tasks.push(task);
        });

        await Promise.all(tasks);

        await inserter.InserNewsFromList(newsList);
        logger.LogInfo(`${newsList.length} news from unKnowNews inserted to DB.`);

        return true;
    } catch (ex) {
        logger.LogError(ex.message, ex.stack);
        return false;
    }
}


module.exports = { GetNews };