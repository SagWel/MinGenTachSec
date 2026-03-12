const mysql = require(`mysql2`);
require (`dotenv`).config();

//création du pool de connexion
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

console.log(process.env.DB_HOST,process.env.DB_USER,process.env.DB_PASSWORD,process.env.DB_DATABASE);


module.exports = pool.promise();