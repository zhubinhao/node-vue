const mysql = require('mysql');

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