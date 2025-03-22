const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const { clientId, guildId, token } = require('./config.json');

const logger = require('./Features/Utility/Logger');

function Deploy() {
	const commands = [];

	const foldersPath = path.join(__dirname, 'Commands');
	const commandFolders = fs.readdirSync(foldersPath);

	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);

			if ('data' in command && 'execute' in command) {
				commands.push(command.data.toJSON());
			} else {
				logger.Warn(`Command ${filePath} does not contain the property "data" or "execute".`, __filename);
			}
		}
	}

	const rest = new REST().setToken(token);


	rest.put(Routes.applicationCommands(clientId), { body: [] })
		.then(() => logger.Info('All application commands have been removed.'))
		.catch(ex => logger.Error(ex.message, ex.stack));

	(async () => {
		try {
			logger.Info(`Loaded ${commands.length} application commands (/) commands.`);

			//NOTE - Update the global application slash commands using Discord's REST API
			// const data = await rest.put(
			// 	Routes.applicationCommands(clientId),
			// 	{ body: commands },
			// );

			//NOTE - Update the application’s slash commands for a specific guild
			const data = await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{ body: commands },
			);

			logger.Info(`Loaded ${data.length} application commands (/) commands.`);
		} catch (ex) {
			logger.Error(ex.message, ex.stack);
		}
	})();
}

module.exports = { Deploy };