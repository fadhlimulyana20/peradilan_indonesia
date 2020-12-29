const pool = require('./connection').pool;
const sql = require('mssql');

const getGugatan = (req, res) =>{
    pool.connect().then(() => {
        const request = new sql.Request(pool);
        request.query("SELECT GP.*, P.NamaLengkap AS Pelapor FROM GUGATAN_PERDATA AS GP INNER JOIN PELAPOR AS P ON P.IdPelapor = GP.IdPelapor").then(result => {
            res.render('gugatan', {
                items : result,
                layout : 'default',
                title : 'Daftar Gugatan'
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

const getDetailGugatan = (req, res) =>{
    const id = parseInt(req.params.id);
    let data = {
        items : null,
        tuntutan : null
    };

    pool.connect().then(() => {
        const request = new sql.Request(pool);
        request.query("SELECT GP.*, P.NamaLengkap AS Pelapor FROM GUGATAN_PERDATA AS GP INNER JOIN PELAPOR AS P ON P.IdPelapor = GP.IdPelapor WHERE GP.NoSurat = $1", [id]).then(result => {
            data = {
                ...data,
                items: result
            }
            request.query("SELECT TG.IsiTuntutan FROM TUNTUTAN_GUGATAN AS TG INNER JOIN GUGATAN_PERDATA AS GP ON GP.NoSurat = TG.NoSuratGugatan WHERE GP.NoSurat = $1", [id]).then(result => {
                data = {
                    ...data,
                    tuntutan : result
                }
                request.query("SELECT T.NamaLengkap AS Terperkara FROM GUGATAN_TERPERKARA AS GT INNER JOIN GUGATAN_PERDATA AS GP ON GP.NoSurat = GT.NoSuratGugatan INNER JOIN TERPERKARA AS T ON T.IdTerperkara = GT.IdTerperkara WHERE GP.NoSurat = $1", [id]).then(result => {
                    data = {
                        ...data,
                        terperkara : result
                    }
                    res.render('gugatan_detail', {
                        ...data,
                        layout : 'default',
                        title : 'Detil Gugatan'
                    })
                }).catch(err => {
                    console.log(err);
                });
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });



    }).catch(err => {
        console.log(err);
    });
}

module.exports = {
    getGugatan,
    getDetailGugatan
}