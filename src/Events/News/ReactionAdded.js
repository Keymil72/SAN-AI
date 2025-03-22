const { Events, EmbedBuilder } = require("discord.js");
const { STATUS } = require("../../Features/Database/Enums/Statuses");

const getter = require("../../Features/Database/Getter");
const updater = require("../../Features/Database/Updater");
const logger = require("../../Features/Utility/Logger");

module.exports = {
    name: Events.MessageReactionAdd,
    once: false,

    async execute(reaction, user) {
        try {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;

            const isValidReaction = Object.values(STATUS).some(
                (item) => item.emoji === reaction.emoji.name
            );

            if (!isValidReaction) return;

            const pendingNews = await getter.GetPendingNewsRecordByMessageId(reaction.message.id);

            if (pendingNews?.length !== 1) return;

            await reaction.users.remove(user.id);

            const receivedEmbed = reaction.message.embeds[0];
            const embed = EmbedBuilder.from(receivedEmbed);
            const newsId = pendingNews[0].newsid;

            switch (reaction.emoji.name) {
                case STATUS.PENDING.emoji:
                    await updater.UpdateNewsStatusById(newsId, STATUS.PENDING.text);

                    embed
                        .setThumbnail(STATUS.PENDING.icon)
                        .setColor(STATUS.PENDING.color);

                    break;

                case STATUS.ACCEPTED.emoji:
                    await updater.UpdateNewsStatusById(newsId, STATUS.ACCEPTED.text);

                    embed
                        .setThumbnail(STATUS.ACCEPTED.icon)
                        .setColor(STATUS.ACCEPTED.color);

                    break;

                case STATUS.REJECTED.emoji:
                    await updater.UpdateNewsStatusById(newsId, STATUS.REJECTED.text);

                    embed
                        .setThumbnail(STATUS.REJECTED.icon)
                        .setColor(STATUS.REJECTED.color);

                    break;
            }

            await reaction.message.edit({ embeds: [embed] });

        } catch (ex) {
            logger.Warn(ex.message, ex.stack);
        }
    },
};
