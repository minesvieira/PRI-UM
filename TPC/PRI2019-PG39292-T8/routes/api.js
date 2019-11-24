var express = require('express');
var router = express.Router();
const fs = require('fs')
var Ficheiros = require('../controllers/ficheiros')
var Ficheiro = require('../models/ficheiros')
var ncp = require('ncp').ncp;

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

/* GET da lista de ficheiros */
router.get('/ficheiros', function(req, res) {
    Ficheiros.listar()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

router.post('/ficheiros', upload.array('ficheiro'), function(req,res){
  for (i = 0; i < req.files.length; i++) {
    
  const oldPath = __dirname + '/../' + req.files[i].path
  const newPath = __dirname + '/../public/ficheiros/' + req.files[i].originalname
  console.log(newPath);

  fs.rename(oldPath, newPath, function (err) {
    if (err) throw err
  })


  var data = new Date()

  var novoFicheiro = new Ficheiro(
    { 
      data: data.toISOString(),
      desc: req.body.desc,
      name: req.files[i].originalname,
      path: newPath,
      mimetype: req.files[i].mimetype, 
      size: req.files[i].size
    });

  }

  novoFicheiro.save(function (err, ficheiro) {
    if (!err) console.log('Ficheiro guardado com sucesso!')
    else console.log('ERRO: ' + err)
    res.redirect('/')
  
  
  })
})

module.exports = router;
