const mysql = require('mysql');
const HOST = '45.32.100.27';
const USER = 'root';
const PASS = '091794';
const DATABASE = 'text';
const db = mysql.createPool({
    host: HOST,
    user: USER,
    password: PASS,
    database: DATABASE,
    multipleStatements:true
});
module.exports={
    db:db,
}