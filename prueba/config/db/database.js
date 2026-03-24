const mysql = require('mysql2');
const data = require('../../data');

const pool = mysql.createPool({
    host: data.server.dbhost,
    user: data.server.dbuser,
    password: data.server.dbpassword,
    database: data.server.db,
    port: 3307,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;