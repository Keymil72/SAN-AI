const { Pool } = require("pg");
const { Kysely, PostgresDialect } = require("kysely");
const { getDB } = require("../../src/Features/Database/DBConnection");
const logger = require("../../src/Features/Utility/Logger");

jest.mock("pg", () => ({
    Pool: jest.fn().mockImplementation(() => ({
        connect: jest.fn().mockResolvedValue({
            release: jest.fn(),
        }),
    })),
}));

jest.mock("kysely", () => ({
    Kysely: jest.fn().mockImplementation(() => ({
        selectFrom: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue([]),
    })),
    PostgresDialect: jest.fn(),
}));

jest.mock("../../src/Features/Utility/Logger", () => ({
    Warn: jest.fn(),
    Error: jest.fn(),
}));

describe("DBConnection", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should initialize database successfully", async () => {
        const db = await getDB();
        expect(db).not.toBeNull();
        expect(Pool).toHaveBeenCalled();
        expect(Kysely).toHaveBeenCalledWith({
            dialect: expect.any(PostgresDialect),
        });
    });

    test("should log a warning and return false if connection check fails", async () => {
        Kysely.mockImplementationOnce(() => ({
            selectFrom: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            execute: jest.fn().mockRejectedValue(new Error("Query error")),
        }));

        const db = await getDB();
        expect(db).toBeNull();
        expect(logger.LogWarn).toHaveBeenCalledWith("Connection check failed: Query error", expect.any(String));
        expect(logger.LogError).toHaveBeenCalledWith("Could not establish a connection to the database.", expect.any(String));
    });
});