const pool = require('./connection').pool;
const sql = require('mssql');

const getBerkas = (req, res) =>{
    pool.connect().then(() => {
        const request = new sql.Request(pool);
        request.query("SELECT * FROM BERKAS_PERKARA INNER JOIN TERPERKARA AS").then(result => {
            res.render('aduan', {
                items : result,
                layout : 'default',
                title : 'Daftar Aduan Pidana'
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