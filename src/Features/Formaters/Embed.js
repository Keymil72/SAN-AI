const { EmbedBuilder } = require("discord.js");
const { botIcon, authorUrl } = require("../../newsConfig.json");

const { STATUS } = require("../Database/Enums/Statuses");

const time = require("./Time");
const logger = require("../Utility/Logger");


async function PendingNews(news) {
    try {
        let _appearanceDate = time.FormatToWarsaw(news.appearancedate);
        let _lastUpdate = time.FormatToWarsaw(news.lastupdate);

        let _embed = new EmbedBuilder()
            .setColor(STATUS.PENDING.color)
            .setTitle(news.title)
            .setURL(news.directlink)
            .setAuthor({ name: client.user.username, iconURL: STATUS.SENT.icon, url: authorUrl })
            .setDescription(news.description)
            .setThumbnail(STATUS.PENDING.icon)
            .addFields(
                { name: "Czytaj dalej", value: news.targetsite },
                { name: "News z dnia", value: `\`\`${_appearanceDate}\`\`` },
                { name: "News zaakceptowany dnia", value: `\`\`${_lastUpdate}\`\`` }
            )
            .setTimestamp(news.appearancedate)
            .setFooter({ text: "Keymil72 -> SAN-AI", iconURL: botIcon });

        return _embed;
    } catch (ex) {
        logger.LogError(ex.message, ex.stack);
        return null;
    }
}

async function News(news) {
    try {
        console.log(news);
        let _appearanceDate = time.FormatToWarsaw(news.appearancedate);
        let _lastUpdate = time.FormatToWarsaw(news.lastupdate);

        let _embed = new EmbedBuilder()
            .setColor(STATUS.SENT.color)
            .setTitle(news.title)
            .setURL(news.directlink)
            .setAuthor({ name: client.user.username, iconURL: STATUS.SENT.icon, url: authorUrl })
            .setDescription(news.description)
            .setThumbnail(STATUS.SENT.icon)
            .addFields(
                { name: "Czytaj dalej", value: news.targetsite },
                { name: "News z dnia", value: `\`\`${_appearanceDate}\`\`` },
                { name: "News zaakceptowany dnia", value: `\`\`${_lastUpdate}\`\`` }
            )
            .setTimestamp(news.appearancedate)
            .setFooter({ text: "Keymil72 -> SAN-AI", iconURL: botIcon });

        return _embed;
    } catch (ex) {
        logger.LogError(ex.message, ex.stack);
        return null;
    }
}

async function AcceptedNews(news) {
    try {
        let _appearanceDate = time.FormatToWarsaw(news.appearancedate);
        let _lastUpdate = time.FormatToWarsaw(news.lastupdate);

        let _embed = new EmbedBuilder()
            .setColor(STATUS.ACCEPTED.color)
            .setTitle(news.title)
            .setURL(news.directlink)
            .setAuthor({ name: client.user.username, iconURL: STATUS.SENT.icon, url: authorUrl })
            .setDescription(news.description)
            .setThumbnail(STATUS.ACCEPTED.icon)
            .addFields(
                { name: "Czytaj dalej", value: news.targetsite },
                { name: "News z dnia", value: `\`\`${_appearanceDate}\`\`` },
                { name: "News zaakceptowany dnia", value: `\`\`${_lastUpdate}\`\`` }
            )
            .setTimestamp(news.appearancedate)
            .setFooter({ text: "Keymil72 -> SAN-AI", iconURL: botIcon });

        return _embed;
    } catch (ex) {
        logger.LogError(ex.message, ex.stack);
        return null;
    }
}

async function RejectedNews(news) {
    try {
        let _appearanceDate = time.FormatToWarsaw(news.appearancedate);
        let _lastUpdate = time.FormatToWarsaw(news.lastupdate);

        let _embed = new EmbedBuilder()
            .setColor(STATUS.REJECTED.color)
            .setTitle(news.title)
            .setURL(news.directlink)
            .setAuthor({ name: client.user.username, iconURL: STATUS.SENT.icon, url: authorUrl })
            .setDescription(news.description)
            .setThumbnail(STATUS.PENDING.icon)
            .addFields(
                { name: "Czytaj dalej", value: news.targetsite },
                { name: "News z dnia", value: `\`\`${_appearanceDate}\`\`` },
                { name: "News zaakceptowany dnia", value: `\`\`${_lastUpdate}\`\`` }
            )
            .setTimestamp(news.appearancedate)
            .setFooter({ text: "Keymil72 -> SAN-AI", iconURL: botIcon });

        return _embed;
    } catch (ex) {
        logger.LogError(ex.message, ex.stack);
        return null;
    }
}

module.exports = { PendingNews, News, AcceptedNews, RejectedNews };