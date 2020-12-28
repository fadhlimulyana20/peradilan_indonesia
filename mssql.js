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

const getHakim = (req, res) =>{
    pool.connect().then(() => {
        const request = new sql.Request(pool);
        request.query("SELECT * FROM HAKIM").then(result => {
            res.status(200).json(result.recordsets);
            pool.close();
        }).catch(err => {
            console.log(err);
            pool.close();
        });
    }).catch(err => {
        console.log(err);
    });
}



module.exports = {
    getHakim
}