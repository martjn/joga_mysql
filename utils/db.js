const mysql = require("mysql2");

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ij6lS*H?ScwD",
  database: "joga_mysql",
});

module.exports = db;