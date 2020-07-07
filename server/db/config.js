const mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Rr9550268!",
//   database: "furnitures",
// });

// CONNECTION TO HEROKU DATABASE
const connection = mysql.createConnection({
  host: "us-cdbr-east-02.cleardb.com",
  user: "b04fbdf304c17d",
  password: "8619e57e",
  database: "heroku_e7e269c9372a826",
});

module.exports = connection;
