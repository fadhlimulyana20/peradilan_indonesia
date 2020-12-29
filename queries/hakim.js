const pool = require('./connection').pool;
const sql = require('mssql');

const getHakim = (req, res) =>{
    pool.connect().then(() => {
        const request = new sql.Request(pool);
        request.query("SELECT * FROM HAKIM").then(result => {
            res.render('hakim', {
                items : result,
                layout : 'default',
                title : 'Daftar Hakim'
            });
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