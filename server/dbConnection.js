var mysql = require('mysql');
require('dotenv').config();

var con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_Name
  });

  con.connect(function(err) {
    if (err) throw err;
  });

  module.exports = con;