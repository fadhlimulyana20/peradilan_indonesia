const pool = require('./connection').pool;
const sql = require('mssql');

const getDetailSuratDakwaan = (req, res) =>{
    const id = parseInt(req.params.id);

    pool.connect().then(() => {
        const request = new sql.Request(pool);
        request.query("SELECT SD.*, P.NamaPengadilan FROM SURAT_DAKWAAN AS SD INNER JOIN PENGADILAN AS P ON P.IdPengadilan = SD.IdPengadilan WHERE NoSuratDakwaan = $1", [id]).then(result => {
            res.render('dakwaan_detail', {
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

module.exports = {
    getDetailSuratDakwaan
}