const { newsChannelId } = require("../../newsConfig.json");
const { STATUS } = require("../Database/Enums/Statuses");

const inserter = require("../Database/Inserter");
const getter = require("../Database/Getter");
const updater = require("../Database/Updater");
const logger = require("../Utility/Logger");
const embed = require("../Formaters/Embed");
const { client } = require("../../Main");

async function Send() {
    try {
        let _channel = client.channels.cache.get(newsChannelId);
        let _result = await getter.GetNews(STATUS.PENDING.text);

        _result?.forEach(async (row) => {
            let _pendingEmbed = await embed.PendingNews(row);

            if (_pendingEmbed == null) throw new Error("Embed is not well formatted.");

            let _message = await _channel.send({ embeds: [_pendingEmbed] });

            await inserter.InsertRecordToPendingNewsTable(_message.id, row.id);

            await _message.react("✅")
            await _message.react("❔")
            await _message.react("❌");
        });
    } catch (ex) {
        logger.LogError(ex.message, ex.stack);
    }
}

//TODO - Tests needed
async function AutoUpdateToAccepted() {
    try {
        let _result = await getter.GetNews(STATUS.PENDING.text);

        _result?.forEach(async (row) => {
            let _messageId = getter.GetPendingNewsRecordByNewsId(row.id);
            let _message = client.channels.cache.get(newsChannelId).messages.fetch(_messageId);

            if (_message == null) throw new Error(`No message found related to newsId: ${row.id}.`);

            await _message.delete();

            if (_currentDate > _appearanceDate) {
                await updater.UpdateNewsStatusById(newsId, STATUS.ACCEPTED.text);
            }
        });
    } catch (ex) {
        logger.LogError(ex.message, ex.stack);
    }
}

module.exports = { Send, AutoUpdateToAccepted };