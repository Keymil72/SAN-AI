const DB = require("../../src/Features/Database/DBConnection.js");
const { Pool } = require("pg");
const { Kysely, PostgresDialect } = require("kysely");

jest.mock("pg", () => {
    const mockClient = {
        release: jest.fn(),
    };
    return {
        Pool: jest.fn().mockImplementation(() => ({
        connect: jest.fn().mockResolvedValue(mockClient),
        })),
    };
});

jest.mock("kysely", () => {
    const execute = jest.fn().mockResolvedValue([{ id: 1 }]);
    const selectFrom = jest.fn().mockReturnValue({ limit: () => ({ execute }) });

    return {
        Kysely: jest.fn().mockImplementation(() => ({
            selectFrom,
        })),
        PostgresDialect: jest.fn(),
    };
});

jest.mock("../../src/config.json", () => ({
    dbUser: "testuser",
    dbHost: "localhost",
    dbName: "testdb",
    dbPassword: "password",
    dbPort: 5432,
    dbMaxConnections: 10,
    dbIdleTimeoutMillis: 30000,
}));

jest.mock("../../src/Features/Utility/Logger.js", () => ({
    LogWarn: jest.fn(),
    LogError: jest.fn(),
}));

const logger = require("../../src/Features/Utility/Logger.js");

describe("Database module", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return a Kysely instance if connection is successful", async () => {
        const db = await DB.getDB();

        expect(db).not.toBeNull();
        expect(Kysely).toHaveBeenCalled();
    });

    it("should log a warning and return false if query fails", async () => {
        const fakeExecute = jest.fn().mockRejectedValue(new Error("Query error"));
        Kysely.mockImplementationOnce(() => ({
            selectFrom: () => ({ limit: () => ({ execute: fakeExecute }) }),
    }));

    const db = await DB.getDB();

    expect(logger.LogWarn).toHaveBeenCalledWith(
        "Connection check failed: Query error",
        expect.any(String)
    );
    expect(logger.LogError).toHaveBeenCalledWith(
        "Could not establish a connection to the database.",
        expect.any(String)
    );
    expect(db).toBeNull();
  });
});
