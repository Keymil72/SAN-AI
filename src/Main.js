const { Client, Collection, Events, GatewayIntentBits, Partials } = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');

const { token } = require('./config.json');
const { Deploy } = require('./DeployCommands');

const logger = require('./Features/Utility/Logger');

function start() {

	global.client = new Client({
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildVoiceStates,
			GatewayIntentBits.GuildWebhooks,
			GatewayIntentBits.GuildMessageReactions,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.GuildMessageReactions,
			GatewayIntentBits.MessageContent,
			GatewayIntentBits.GuildMembers
		],
		partials: [
			Partials.Message,
			Partials.Channel,
			Partials.Reaction
		]
	});

	client.commands = new Collection();

	const commandFoldersPath = path.join(__dirname, 'Commands');
	const commandFolders = fs.readdirSync(commandFoldersPath);

	for (const folder of commandFolders) {
		const commandsPath = path.join(commandFoldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);

			if ('data' in command && 'execute' in command) {
				client.commands.set(command.data.name, command);
			} else {
				logger.Warn(`Command ${filePath} does not contain the property "data" or "execute".`, __filename);
			}
		}
	}

	const eventFoldersPath = path.join(__dirname, 'Events');
	const eventFolders = fs.readdirSync(eventFoldersPath);

	for (const folder of eventFolders) {
		const eventsPath = path.join(eventFoldersPath, folder);
		const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

		for (const file of eventFiles) {
			const eventFilePath = path.join(eventsPath, file);
			const event = require(eventFilePath);

			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args));
			} else {
				client.on(event.name, (...args) => event.execute(...args));
			}

		}
	}

	client.on(Events.InteractionCreate, async interaction => {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			logger.Error(`Unsupported command "${interaction.commandName}".`, __filename);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (ex) {
			logger.Error(ex.message, ex.stack);

			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'Podczas wykonywania polecenia wystąpił nie oczekiwany błąd!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'Podczas wykonywania polecenia wystąpił nie oczekiwany błąd!', ephemeral: true });
			}
		}
	});

	//logowanie bota
	client.login(token).then(() => {
		Deploy();
	});
}

start();

module.exports = { client, start };