const dbConnection = require("./DBConnection");

async function up() {
    const DB = await dbConnection.getDB();

    await DB.schema
        .createTable("news")
            .addColumn("id", "serial", col => col.primaryKey())
            .addColumn("title", "varchar(255)")
            .addColumn("description", "varchar(4095)")
            .addColumn("fromsite", "varchar(255)")
            .addColumn("targetsite", "varchar(255)")
            .addColumn("status", "varchar(8)")
            .addColumn("appearancedate", "timestamp")
            .addColumn("lastupdate", "timestamp")
            .addColumn("directlink", "varchar(255)")
        .execute();

    console.log("Table 'news' created successfully.");

    await DB.schema
        .createTable("pendingnews")
            .addColumn("messageid", "bigint", col => col.primaryKey().notNull().unique())
            .addColumn("newsid", "integer", col => col.notNull().references("news.id").onDelete("cascade"))
        .execute();

    console.log("Table 'pendingnews' created successfully.");
}

module.exports = { up };