const mysql = require("mysql2");
const config = require("./config");

const pool = mysql.createPool(config.databaseconfig);

exports.getConnection = () => {
 return new Promise((resolve, reject) => {
  pool.getConnection(function(err, connection) {
   if (err) {
    return reject(err);
   }
   resolve(connection);
  });
 });
};
