const dotenv = require("dotenv");
dotenv.config();

const databaseconfig = {
 host: process.env.DB_HOST,
 database: process.env.MYSQL_DB,
 user: process.env.DB_USER,
 password: process.env.DB_PASS,
 port: process.env.MYSQL_PORT
};
module.exports = { databaseconfig: databaseconfig };
