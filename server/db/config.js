const mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Rr9550268!",
//   database: "furnitures",
// });

// CONNECTION TO HEROKU DATABASE
var connection = mysql.createConnection({
  host: "us-cdbr-east-02.cleardb.com",
  user: "b04fbdf304c17d",
  password: "8619e57e",
  database: "heroku_e7e269c9372a826",
}); // Recreate the connection, since;

function handleDisconnect(client) {
  client.on("error", function (error) {
    if (!error.fatal) return;
    // if (error.code !== "PROTOCOL_CONNECTION_LOST") throw error;

    console.error("> Re-connecting lost MySQL connection: " + error.stack);

    // NOTE: This assignment is to a variable from an outer scope; this is extremely important
    // If this said `client =` it wouldn't do what you want. The assignment here is implicitly changed
    // to `global.mysqlClient =` in node.
    mysqlClient = mysql.createConnection(client);
    handleDisconnect(mysqlClient);
    mysqlClient.connect();
  });
}

handleDisconnect(connection);

module.exports = connection;
