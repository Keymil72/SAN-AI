const embed = require("../../src/Features/Formaters/Embed");
const logger = require("../../src/Features/Utility/Logger");

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
        setFooter: jest.fn().mockReturnThis(),
    })),
}));

jest.mock("../../src/Features/Formaters/Time", () => ({
    FormatToWarsaw: jest.fn(),
}));

jest.mock("../../src/Features/Utility/Logger", () => ({
    Error: jest.fn(),
}));

describe("PendingNews", () => {
    it("should log an error and return null if an exception occurs", async () => {
        const news = null;

        const _embed = await embed.PendingNews(news);

        expect(logger.LogError).toHaveBeenCalled();
        expect(_embed).toBeNull();
    });


});