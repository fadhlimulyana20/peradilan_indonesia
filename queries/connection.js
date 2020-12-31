const sql = require('mssql');

const pool = new sql.ConnectionPool({
    user: 'peradilan_indo',
    password: 'password123',
    server: 'localhost',
    database: 'PeradilanIndonesiaNew'
});

pool.connect(err => {
    if(err){
        console.log(err);
    }else{
        console.log("connected");
    }
});

module.exports = {
    pool
}