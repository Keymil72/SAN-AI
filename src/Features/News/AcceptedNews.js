const { newsChannelId } = require("../../newsConfig.json");
const { STATUS } = require("../Database/Enums/Statuses");

const getter = require("../Database/Getter");
const updater = require("../Database/Updater");
const logger = require("../Utility/Logger");
const embed = require("../Formaters/Embed");
const { client } = require("../../Main");

function Publish(){
    let _channel = client.channels.cache.get(newsChannelId);
    let _result = getter.GetNews(STATUS.PENDING.text);

    try {
        _result?.forEach((row) => {
            let _acceptedEmbed = embed.AcceptedNews(row);

            if (_acceptedEmbed == null) throw new Error("Embed is not well formatted.");

            let _message = _channel.send({ embeds: [_acceptedEmbed] });
            _message.react(STATUS.SENT.emoji)

            updater.UpdateNewsStatusById(row.id, STATUS.SENT.text);
        });

        logger.LogInfo(`${_result?.length} news has been posted.`);
    }catch(ex){
        logger.LogError(ex.message, ex);
    }
}

module.exports = { Publish };