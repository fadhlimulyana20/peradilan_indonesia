const pool = require('./connection').pool;
const sql = require('mssql');

const getDetailTerperkara = (req, res) =>{
    const id = parseInt(req.params.id);

    let data = {};

    pool.connect().then(() => {
        const request = new sql.Request(pool);
        request.query("SELECT * FROM TERPERKARA WHERE IdTerperkara = $1", [id]).then(result => {
            data = {
                ...data,
                items : result
            }
            request.query("SELECT * FROM DAKWAAN_TERPERKARA WHERE IdTerperkara = $1", [id]).then(result => {
                data = {
                    ...data,
                    surat_dakwaan : result
                }
                console.log(data);
                res.render('terperkara_detail', {
                    ...data,
                    layout : 'default',
                    title : 'Detail Terperkara'
                });
                pool.close();
            }).catch(err => {
                console.log(err);
                pool.close();
            });
        }).catch(err => {
            console.log(err);
            pool.close();
        });
    }).catch(err => {
        console.log(err);
    })
} 

module.exports = {
    getDetailTerperkara
}