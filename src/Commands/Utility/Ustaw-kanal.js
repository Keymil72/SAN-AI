const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const fs = require("fs");
const logger = require("../../Features/Utility/Logger");
const CONFIG_PATH = "./src/newsConfig.json";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ustaw-kanal")
        .setDescription("Ustawia kanał wzależności od opcji, na którym bot będzie wysyłał newsy lub newsy do akceptacji")
        .addStringOption(option =>
            option.setName("typ")
                .setDescription("Typ kanału")
                .setRequired(true)
                .addChoices(
                    { name: "newsowy", value: "newsowy" },
                    { name: "akceptacji", value: "akceptacji" },
                )
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });


        const _CHOICE = interaction.options.getString("typ");
        const _CHANNEL = interaction.channelId;

        if (_CHOICE === "newsowy") {
            let _config = await GetConfig();

            if (_config != null) {
                _config.newsChannelId = _CHANNEL;

                fs.writeFileSync(CONFIG_PATH, JSON.stringify(_config, null, 2));

                await interaction.editReply({ content: "Ustawiono kanał newsowy." });
            }
            else {
                await interaction.editReply({ content: "Nie można odczytać pliku konfiguracyjnego." });
                return;
            }
        }else if (_CHOICE === "akceptacji") {
            let _config = await GetConfig();

            if (_config != null) {
                _config.newsAcceptanceChannelId = _CHANNEL;

                fs.writeFileSync(CONFIG_PATH, JSON.stringify(_config, null, 2));

                await interaction.editReply({ content: "Ustawiono kanał akceptacji." });
            }
            else {
                await interaction.editReply({ content: "Nie można odczytać pliku konfiguracyjnego." });
                return;
            }
        } else {
            await interaction.editReply({ content: "Nieznany typ kanału." });
        }
    },
};

async function GetConfig(){
    try {
        const _RAWDATA = await fs.readFileSync(CONFIG_PATH);
        let config = JSON.parse(_RAWDATA);

        return config;
    } catch (ex) {
        logger.LogError(ex.message, ex.stack);
        return null;
    }
}
