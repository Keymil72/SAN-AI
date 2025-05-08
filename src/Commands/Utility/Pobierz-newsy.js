const { SlashCommandBuilder } = require("discord.js");

const logger = require("../../Features/Utility/Logger");
const news = require("../../WebScrapper/Utility/News");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pobierz-newsy")
        .setDescription("Pobiera newsy ze źródeł i dodaje je do bazy danych"),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        if (await news.Get()){
            interaction.editReply("Newsy zostały pobrane i dodane do bazy danych.");
        }else{
            interaction.editReply("Nie udało się pobrać newsów.");
        }

    },
};
