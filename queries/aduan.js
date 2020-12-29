const pool = require('./connection').pool;
const sql = require('mssql');

const getAduan = (req, res) =>{
    pool.connect().then(() => {
        const request = new sql.Request(pool);
        request.query("SELECT * FROM ADUAN_PIDANA").then(result => {
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

const getDetaliAduan = (req, res) => {
    const id = parseInt(req.params.id);

    pool.connect().then(() => {
        const request = new sql.Request(pool);
        request.query(
                "SELECT AP.*, LK.NamaLembaga as Kepolisian, P.NamaLengkap as Pelapor, P.IdPelapor FROM ADUAN_PIDANA AS AP INNER JOIN PEMBUATAN_ADUAN AS PA ON PA.NoAduan = AP.NoAduan INNER JOIN PELAPOR AS P ON P.IdPelapor = PA.IdPelapor INNER JOIN LEMBAGA_KEPOLISIAN AS LK ON LK.IdLembaga = AP.IdLembagaKepolisian WHERE AP.NoAduan = $1 ", 
                [id]
            ).then(result => {
            res.render('aduan_detail', {
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
    getAduan,
    getDetaliAduan
}