const { Pool } = require("pg");
const { Kysely, PostgresDialect } = require("kysely");

const config = require("../../config.json");
const logger = require("../Utility/Logger");

const pool = new Pool({
    user: config.dbUser,
    host: config.dbHost,
    database: config.dbName,
    password: config.dbPassword,
    port: config.dbPort,
    max: config.dbMaxConnections,
    idleTimeoutMillis: config.dbIdleTimeoutMillis,
});

async function initializeDatabase() {
    try {
        const client = await pool.connect();
        client.release();

        return new Kysely({
            dialect: new PostgresDialect({ pool }),
        });
    } catch (ex) {
        logger.LogWarn(ex.message, ex.stack);
        return null;
    }
}

async function checkConnection() {
    try {
        const db = await initializeDatabase();

        if (db === null) {
            logger.LogWarn("Unable to establish a connection to database.", __filename);
            return false;
        }

        await db.selectFrom('news').limit(1).execute();

        return true;
    } catch (ex) {
        logger.LogWarn(`Connection check failed: ${ex.message}`, ex.stack);
        return false;
    }
}

async function getDB() {
    const isConnected = await checkConnection();

    if (isConnected) {
        return await initializeDatabase();
    } else {
        logger.LogError("Could not establish a connection to the database.", __filename);
        return null;
    }
}

module.exports = { getDB };
