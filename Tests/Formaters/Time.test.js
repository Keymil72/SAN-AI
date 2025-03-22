const moment = require("moment-timezone");

const { FormatToWarsaw, FromatForLog } = require("../../src/Features/Formaters/Time");


describe("FormatToWarsaw", () => {
    test("should format valid timestamp to Warsaw time", () => {
        const timeStamp = "2025-03-22T12:00:00Z";
        const expected = moment(timeStamp).tz("Europe/Warsaw").format("HH:mm DD.MM.YYYY");
        const result = FormatToWarsaw(timeStamp);

        expect(result).toBe(expected);
    });

    test("should return current Warsaw time for invalid timestamp", () => {
        const invalidTimeStamp = "invalid-timestamp";
        const expected = moment().tz("Europe/Warsaw").format("HH:mm DD.MM.YYYY");
        const result = FormatToWarsaw(invalidTimeStamp);

        expect(result).toBe(expected);
    });

    test("should return current Warsaw time for no timestamp", () => {
        const expected = moment().tz("Europe/Warsaw").format("HH:mm DD.MM.YYYY");
        const result = FormatToWarsaw();

        expect(result).toBe(expected);
    });
});

describe("FromatForLog", () => {
    test("should return current time and date in the correct format", () => {
        const expectedTime = moment().format('HH:mm:ss');
        const expectedDate = moment().format('DD.MM.YYYY');
        const expectedDateTime = `(${expectedTime}) [${expectedDate}]`;
        const result = FromatForLog();

        expect(result).toBe(expectedDateTime);
    });

    test("should return a string in the correct format", () => {
        const result = FromatForLog();
        const regex = /\(\d{2}:\d{2}:\d{2}\) \[\d{2}\.\d{2}\.\d{4}\]/;

        expect(result).toMatch(regex);
    });
});