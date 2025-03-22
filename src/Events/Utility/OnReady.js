const { Events, ActivityType } = require("discord.js");

const cron = require("node-cron");

const pendingsNews = require("../../Features/News/PendingsNews");
const logger = require("../../Features/Utility/Logger");


module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		client.user.setPresence({ activities: [{ name: "/pomoc", type: ActivityType.Custom }], status: "online" });

		logger.Info(`${client.user.tag} started`);

		cron.schedule("0 0 8 * * Saturday", () => {
			pendingsNews.Send();
		});

		cron.schedule("0 30 17 * * Saturday", () => {
			pendingsNews.AutoUpdateToAccepted();
		});

		cron.schedule("0 0 18 * * Saturday", () => {
			//TODO - Implement send accepted news at specific days and time
		});
	},
};