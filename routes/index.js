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

module.exports = router