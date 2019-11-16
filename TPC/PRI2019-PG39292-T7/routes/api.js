const express = require('express')
const router = express.Router()

var Obras = require('../controllers/obras')

router.get('/obras', function(req, res, next) {
     if(req.query.anoCriacao){
      Obras.listarA(req.query.anoCriacao)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    }
    else if(req.query.periodo){
      Obras.listarP(req.query.periodo)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    }
    else if(req.query.compositor){
        Obras.listarC(req.query.compositor)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
      }
    else{
    Obras.listar()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
    }    
})

/*GET: recupera a informação de um compositor */
router.get('/compositores',function(req, res) {
  Obras.listarCompositores()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})

router.get('/compositores/:nome',function(req, res) {
    Obras.listarCompositoresNome(req.params.nome)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
  })
  



module.exports = router