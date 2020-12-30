const pool = require('./connection').pool;
const sql = require('mssql');

const getPersidangan = (req, res) =>{
    pool.connect().then(() => {
        const request = new sql.Request(pool);
        request.query("SELECT P.*, C.NamaPengadilan FROM PERSIDANGAN AS P INNER JOIN PENGADILAN AS C ON C.IdPengadilan = P.IdPengadilan").then(result => {
            res.render('persidangan', {
                items : result,
                layout : 'default',
                title : 'Daftar Persidangan'
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

const getDetailPersidangan = (req, res) =>{
    const id = parseInt(req.params.id);

    pool.connect().then(() => {
        const request = new sql.Request(pool);
        request.query("SELECT P.*, C.NamaPengadilan, H.NamaLengkap AS PimpinanSidang FROM PERSIDANGAN AS P INNER JOIN PENGADILAN AS C ON C.IdPengadilan = P.IdPengadilan INNER JOIN PIMPINAN_SIDANG AS PS ON PS.NoSidang = P.NoSidang INNER JOIN HAKIM AS H ON H.NIP = PS.NipHakim WHERE P.NoSidang = $1", [id]).then(result => {
            res.render('persidangan_detail', {
                items : result,
                layout : 'default',
                title : 'Daftar Persidangan'
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

const insertPersidangan = (req, res) => {
    const { no_ruang, jenis, tanggal, jam, agenda } = req.body;

    pool.connect().then(() => {
        const transaction = new sql.Transaction(pool);
        transaction.begin().then(() => {
            const request = new sql.Request(transaction);
            request.query(
                `INSERT INTO PERSIDANGAN (NoRuang, Tanggal, Jenis, Jam, Agenda)
                 VALUES ($1, $2, $3, $4, $5)`, [no_ruang, tanggal, jenis, jam, agenda]
            ).then(() => {
                transaction.commit().then(resp => {
                    console.log(resp);
                    pool.close();
                }).catch(err => {
                    console.log("Error in transaction commit " + err);
                    pool.close();
                })
            }).catch(err => {
                console.log("Error in Transaction Begin " + err);
                pool.close();
            })
        })
    })
}

module.exports = {
    getPersidangan,
    getDetailPersidangan
}