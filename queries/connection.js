const sql = require('mssql');

const pool = new sql.ConnectionPool({
    user: 'peradilan_indo',
    password: '@sapisapi123',
    server: 'localhost',
    database: 'PeradilanIndonesia'
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