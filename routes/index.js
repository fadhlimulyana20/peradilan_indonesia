const express = require('express')
const router = express.Router();

const Query = require('../queries');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.render('index', {layout: 'default', title: 'Sistem Informasi Peradilan Indonesia'});
})

//Hakim 
router.get('/hakim', Query.hakim.getHakim);

// Aduan
router.get('/aduan', Query.aduan.getAduan);
router.get('/aduan/:id', Query.aduan.getDetaliAduan);

// Gugatan
router.get('/gugatan', Query.gugatan.getGugatan);
router.get('/gugatan/:id', Query.gugatan.getDetailGugatan);

// Terperkara
router.get('/terperkara/:id', Query.terperkara.getDetailTerperkara);

// Persidangan
router.get('/persidangan', Query.persidangan.getPersidangan);
router.get('/persidangan/:id', Query.persidangan.getDetailPersidangan);

// Putusan 
router.get('/putusan/:id', Query.putusan.getDetailPutusan);

// Surat Dakwaan
router.get('/surat_dakwaan/:id', Query.surat_dakwaan.getDetailSuratDakwaan);

module.exports = router