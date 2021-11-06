const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host:"en1ehf30yom7txe7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user:"hetww1jqpqdg154l",
    password:"qedfjgwyf41e382d",
    database:"qixzc16b8boysi4k",
    multipleStatements: true
  });

  mysqlConnection.connect(function (err) {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log('En linea...');
    }
  });

  module.exports = mysqlConnection;