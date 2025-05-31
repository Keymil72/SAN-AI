const { newsChannelId } = require("../../newsConfig.json");
const { STATUS } = require("../Database/Enums/Statuses");

const getter = require("../Database/Getter");
const updater = require("../Database/Updater");
const gemini = require("../../WebScraper/AI/Gemini");
const logger = require("../Utility/Logger");
const embed = require("../Formaters/Embed");

// TODO - Tests needed -- embed is not well formatted
async function Publish(){
    let _channel = await client.channels.cache.get(newsChannelId);
    let _result = await getter.GetNews(STATUS.PENDING.text);
    let _toUpdate = await gemini.GetIntrestingNews(_result);
    await updater.UpdateNewsStatusFromList(_toUpdate, STATUS.SENT.text);

    try {
        _result.forEach(async (_row) => {
            console.log(_row);
            let _acceptedEmbed = await embed.News(_row);

            if (_acceptedEmbed == null) throw new Error("Embed is not well formatted.");

            let _toDeleteMessageId = await getter.GetPendingNewsRecordByNewsId(_row.id);
            let _toDeleteMessage = await _channel.messages.fetch(_toDeleteMessageId.messageid);
            _toDeleteMessage.delete();

            let _message = await _channel.send({ embeds: [_acceptedEmbed] });
            _message.react(STATUS.SENT.emoji)

            updater.UpdateNewsStatusById(_row.id, STATUS.SENT.text);
        });

        logger.LogInfo(`${_result?.length} news has been posted.`);
        return true;
    }catch(ex){
        logger.LogError(ex.message, ex);
        return false;
    }
}

async function PublishPending(){
    let _channel = await client.channels.cache.get(newsChannelId);
    let _result = await getter.GetNews(STATUS.PENDING.text);

    _result = await gemini.GetIntrestingNews(_result);
    await updater.UpdateNewsStatusFromList(_result, STATUS.ACCEPTED.text);

    // TODO - Add update from status to status

    try {
        for(let _row in _result) {
            let _acceptedEmbed = await embed.News(_row);

            if (_acceptedEmbed == null) throw new Error("Embed is not well formatted.");

            let _toDeleteMessageId = await getter.GetPendingNewsRecordByNewsId(_row.id);
            let _toDeleteMessage = await _channel.messages.fetch(_toDeleteMessageId.messageid);
            _toDeleteMessage.delete();

            let _message = await _channel.send({ embeds: [_acceptedEmbed] });
            _message.react(STATUS.SENT.emoji)

            updater.UpdateNewsStatusById(_row.id, STATUS.SENT.text);
        };

        logger.LogInfo(`${_result?.length} news has been posted.`);
        return true;
    }catch(ex){
        logger.LogError(ex.message, ex);
        return false;
    }
}

module.exports = { Publish, PublishPending };