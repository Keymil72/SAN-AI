const axios = require('axios');
const cheerio = require('cheerio');

const logger = require('../../Features/Utility/Logger');
const inserter = require('../../Features/Database/Inserter');
const urlValidator = require('../../Features/Utility/UrlValidator');
const newsBuilder = require('../Utility/NewsBuilder');

const url = 'https://www.bleepingcomputer.com/';

// TODO - tests needed
async function GetNews(){
    logger.LogInfo('Trying to get news from unKnowNews...');

    try {
        let newsList = [];

        axios(url).then((response) => {
            const _html = response.data;
            const _content = cheerio.load(_html);

            _content('#bc-home-news-main-wrap', _html)
                .first()
                .find('li')
                .each( async function (i) {
                if (_content(this).find('.bc_latest_news_text')) {
                    let _title = _content(this).find('h4').find('a').text();
                    if (_title.length < 1)
                        return;

                    let _link = _content(this).find('h4').find('a').attr('href');
                    let _description = _content(this).find('p').text();

                    _link = await urlValidator.isUrlValid(_link) ? _link : url;

                    const news = new newsBuilder.NewsBuilder()
                        .setTitle(_title)
                        .setDescription(_description)
                        .setLink(_link)
                        .setSource(url)
                        .build();

                   newsList.push(news);

                }
            });
        });

        await inserter.InserNewsFromList(newsList);
        logger.LogInfo(`${newsList.length} news from unKnowNews inserted to DB.`);
    }catch (ex){
        logger.LogError(ex.message, ex.stack);
    }
}

module.exports = { GetNews };