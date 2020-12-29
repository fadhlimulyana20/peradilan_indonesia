const pool = require('./connection').pool;
const sql = require('mssql');

const getDetailPutusan = (req, res) =>{
    const id = parseInt(req.params.id);

    pool.connect().then(() => {
        const request = new sql.Request(pool);
        request.query("SELECT * FROM PUTUSAN WHERE NoSidang = $1", [id]).then(result => {
            res.render('putusan_detail', {
                items : result,
                layout : 'default',
                title : 'Detail Putusan'
            });
            pool.close();
        }).catch(err => {
            console.log(err);
            pool.close();
        });
    }).catch(err => {
        console.log(err);
    })
}

module.exports = {
    getDetailPutusan
}