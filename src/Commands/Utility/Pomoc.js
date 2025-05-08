const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const moment = require("moment");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pomoc")
        .setDescription("Wyświetla dostępne komendy"),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const CURRENTDATE = moment.utc().format("DD.MM.YYYY HH:mm");
        const FOOTER = "Keymil72 -> SAN-AI -> pomoc • " + CURRENTDATE;

        let _embedPomoc = new EmbedBuilder()
            .setTitle("Dostępne komendy bota SAN-AI")
            .setDescription(`Dodatkowo dostępne są kanały z news'ami z IT.`)
            .setColor("#183771")
            .addFields(
                {
                    name: "/pobierz-newsy",
                    value: "Pobiera ręcznie newsy ze źródeł i dodaje je do bazy danych",
                },
                {
                    name: "/pomoc ",
                    value: "Wyświetla dostępne komendy i ich informacje",
                },
                {
                    name: "/ustaw-kanal",
                    value: "Ustawia kanał wzależności od opcji, na którym bot będzie wysyłał newsy lub newsy do akceptacji",
                }
            )
            .setFooter({ text: FOOTER });

        interaction.editReply({ embeds: [_embedPomoc] });
    },
};
