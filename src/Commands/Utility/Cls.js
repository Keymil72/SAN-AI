const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");



//NOTE - Added for dev purpose. This command is used to clear a specified number of messages from a channel.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('cls')
        .setDescription('Komenda do czyścienia określonej liczby wiadomości')
        .addIntegerOption(option =>
            option.setName("message_amount")
                .setDescription('Liczba wiadomości do usunięcia')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("overload")
                .setDescription('Przeciążenie komendy')
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const client = interaction.client;
        let member = interaction.member;
        const ch = interaction.channel;

        const overload = await interaction.options.getString('overload') == null ? '' : interaction.options.getString('overload');
        const messageAmount = interaction.options.getInteger('message_amount');
        let chString = ch.isThread() ? `Wątek: ${ch.name}` : ch.toString();
        const commandData = "``` " + interaction.commandName + " " + messageAmount + " " + overload + " ```";


        if (ch.isTextBased()) {
            let messagesDeleted = 0;
            if (messageAmount != null && messageAmount >= 1) {
                await ch.messages.fetch({ limit: messageAmount }).then(messages => {
                    messages.forEach(message => {
                        if (message.deletable) {
                            message.delete()
                            messagesDeleted++;
                        }
                    });
                });
            } else if (messageAmount == 0) {
                await ch.messages.fetch().then(messages => {
                    messages.forEach(message => {
                        if (message.deletable) {
                            message.delete()
                            messagesDeleted++;
                        }
                    });
                });
            }
        } else {
            await interaction.reply({ content: 'Nie podano liczby wiadomości do usunięcia', ephemeral: true });
            return;
        }
        await interaction.reply({ content: 'Ja tu tylko sprzątam... 🧹', ephemeral: true });
    },
};