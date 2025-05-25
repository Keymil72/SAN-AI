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
        const ch = interaction.channel;

        const overload = await interaction.options.getString('overload') == null ? '' : interaction.options.getString('overload');
        const messageAmount = interaction.options.getInteger('message_amount');
        await interaction.reply({ content: 'Ja tu tylko sprzątam... 🧹', ephemeral: true });

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
            }else if (overload != null && overload.toLowerCase() === 'all') {
                for (let i = 0; i < 20; i++) {
                    await ch.bulkDelete(100).then(deletedMessages => {
                        messagesDeleted = deletedMessages.size;
                        interaction.editReply({ content: `Usunięto <= ${messagesDeleted} wiadomości z kanału ${ch.name}.`, ephemeral: true });
                    }).catch(err => {
                        console.error('Błąd podczas usuwania wiadomości:', err);
                    });
                }
            }
        } else {
            await interaction.editReply({ content: 'Nie podano liczby wiadomości do usunięcia', ephemeral: true });
            return;
        }
        await interaction.editReply({ content: 'Ja tu tylko sprzątam... 🧹', ephemeral: true });
    },
};