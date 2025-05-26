const { newsChannelId } = require("../../newsConfig.json");
const { STATUS } = require("../Database/Enums/Statuses");

const inserter = require("../Database/Inserter");
const getter = require("../Database/Getter");
const updater = require("../Database/Updater");
const acceptedNews = require("./AcceptedNews");
const logger = require("../Utility/Logger");
const embed = require("../Formaters/Embed");

async function Send() {
    try {
        let _channel = client.channels.cache.get(newsChannelId);
        let _result = await getter.GetNews(STATUS.NEW.text);

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

async function UpdateToPending() {
    try {
        let _result = await getter.GetNews(STATUS.NEW.text);

        await updater.UpdateNewsStatusFromList(_result, STATUS.PENDING.text);
    } catch (ex) {
        logger.LogError(ex.message, ex.stack);
    }
}

//TODO - Tests needed
async function AutoUpdateToAccepted() {
    try {
        await acceptedNews.Publish();

        return true;
    } catch (ex) {
        logger.LogError(ex.message, ex.stack);
        return false;
    }
}

module.exports = { Send, AutoUpdateToAccepted, UpdateToPending };