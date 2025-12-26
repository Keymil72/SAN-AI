const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const fs = require("fs");
const logger = require("../../Features/Utility/Logger");
const CONFIG_PATH = "./src/newsConfig.json";
const MigrateDB = require("../../Features/Database/DBSetup");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ustaw")
        .setDescription("Ustawia początkowe parametry bota SAN-AI na serwerze w tym bazę danych (wykonaj raz na początku wgrania bota!)")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        await MigrateDB.up();

        await interaction.editReply({ content: "Ustawiono bazę danych." });
    },
};
