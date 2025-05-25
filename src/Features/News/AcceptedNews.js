const { newsChannelId } = require("../../newsConfig.json");
const { STATUS } = require("../Database/Enums/Statuses");

const getter = require("../Database/Getter");
const updater = require("../Database/Updater");
const logger = require("../Utility/Logger");
const embed = require("../Formaters/Embed");
const { client } = require("../../Main");

// TODO - Tests needed
function Publish(){
    let _channel = client.channels.cache.get(newsChannelId);
    let _result = getter.GetNews(STATUS.ACCEPTED.text);

    try {
        for(let _row in _result) {
            let _acceptedEmbed = embed.AcceptedNews(row);

            if (_acceptedEmbed == null) throw new Error("Embed is not well formatted.");

            let _message = _channel.send({ embeds: [_acceptedEmbed] });
            _message.react(STATUS.SENT.emoji)

            updater.UpdateNewsStatusById(_row.id, STATUS.SENT.text);
        };

        logger.LogInfo(`${_result?.length} news has been posted.`);
    }catch(ex){
        logger.LogError(ex.message, ex);
    }
}

module.exports = { Publish };