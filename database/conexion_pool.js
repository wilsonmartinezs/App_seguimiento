const mysql = require('mysql2');

const pool = mysql.createPool(
    {
    
   
        host: 'localhost',
        user: 'root',
        password:'',
        database: 'sena'
  
/*
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_DATABASE


     */
   
    }
    );

const conexion = pool.promise();

module.exports =conexion;