const {
    PendingNews,
    News,
    AcceptedNews,
    RejectedNews
} = require("../../src/Features/Formaters/Embed.js");

    const { EmbedBuilder } = require("discord.js");
    jest.mock("discord.js", () => ({
        EmbedBuilder: jest.fn().mockImplementation(() => ({
            setColor: jest.fn().mockReturnThis(),
            setTitle: jest.fn().mockReturnThis(),
            setURL: jest.fn().mockReturnThis(),
            setAuthor: jest.fn().mockReturnThis(),
            setDescription: jest.fn().mockReturnThis(),
            setThumbnail: jest.fn().mockReturnThis(),
            addFields: jest.fn().mockReturnThis(),
            setTimestamp: jest.fn().mockReturnThis(),
            setFooter: jest.fn().mockReturnThis()
        }))
    }));

    jest.mock("../../src/Features/Formaters/Time.js", () => ({
        FormatToWarsaw: jest.fn((d) => `formatted-${d}`)
    }));

    jest.mock("../../src/Features/Utility/Logger.js", () => ({
        LogError: jest.fn()
    }));

    jest.mock("../../src/newsConfig.json", () => ({
        botIcon: "https://boticon.url",
        authorUrl: "https://author.url"
    }));

    jest.mock("../../src/Features/Database/Enums/Statuses.js", () => ({
        STATUS: {
            PENDING: { color: "#FFA500", icon: "https://pending.icon" },
            SENT: { color: "#00FF00", icon: "https://sent.icon" },
            ACCEPTED: { color: "#0000FF", icon: "https://accepted.icon" },
            REJECTED: { color: "#FF0000", icon: "https://rejected.icon" }
        }
    }));

    global.client = {
        user: {
            username: "TestBot"
        }
    };

    const exampleNews = {
        title: "Sample Title",
        directlink: "https://example.com",
        description: "Sample description",
        appearancedate: "2023-10-01T10:00:00Z",
        lastupdate: "2023-10-02T12:00:00Z",
        targetsite: "Example Site"
    };

    describe("NewsEmbeds", () => {
        it("should create PendingNews embed", async () => {
          const embed = await PendingNews(exampleNews);
          expect(embed.setColor).toHaveBeenCalledWith("#FFA500");
          expect(embed.setTitle).toHaveBeenCalledWith("Sample Title");
          expect(embed.setURL).toHaveBeenCalledWith("https://example.com");
          expect(embed.setAuthor).toHaveBeenCalledWith({
            name: "TestBot",
            iconURL: "https://sent.icon",
            url: "https://author.url"
          });
          expect(embed.addFields).toHaveBeenCalled();
        });

        it("should create News embed", async () => {
          const embed = await News(exampleNews);
          expect(embed.setColor).toHaveBeenCalledWith("#00FF00");
        });

        it("should create AcceptedNews embed", async () => {
          const embed = await AcceptedNews(exampleNews);
          expect(embed.setColor).toHaveBeenCalledWith("#0000FF");
        });

        it("should create RejectedNews embed", async () => {
          const embed = await RejectedNews(exampleNews);
          expect(embed.setColor).toHaveBeenCalledWith("#FF0000");
        });
    });
