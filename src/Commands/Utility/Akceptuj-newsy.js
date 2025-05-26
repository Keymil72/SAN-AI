const { SlashCommandBuilder } = require("discord.js");

const newNews = require("../../Features/News/NewNews");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("akceptuj-newsy")
        .setDescription("Pobiera newsy ze źródeł i dodaje je do bazy danych"),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        if (await newNews.AutoUpdateToAccepted()){
            interaction.editReply("Newsy zostały pobrane i dodane do bazy danych.");
        }else{
            interaction.editReply("Nie udało się pobrać newsów.");
        }

    },
};
