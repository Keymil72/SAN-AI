const STATUS = Object.freeze({
    PENDING: {
        text: "pending",
        emoji: "❔",
        color: "#ffa726",
        icon: "https://i.imgur.com/Oc1qjLu.png"
    },

    ACCEPTED: {
        text: "accepted",
        emoji: "✅",
        color: "#32ba7c",
        icon: "https://i.imgur.com/rzkvTsO.png"
    },

    REJECTED: {
        text: "rejected",
        emoji: "❌",
        color: "#ee3624",
        icon: "https://i.imgur.com/8zYrE0O.png"
    },

    SENT: {
        text: "sent",
        emoji: "⭐",
        color: "#183771",
        icon: "https://i.imgur.com/aPopl5M.png"
    },
    NEW: {
        text: "new",
        emoji: "🆕",
        color: "#4a148c",
        icon: "https://i.imgur.com/1k0b2dH.png"
    }
});

module.exports = { STATUS };
