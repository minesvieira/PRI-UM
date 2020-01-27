var express = require('express');
var router = express.Router();

var axios = require('axios')

var key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ'

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/legislacao' + '?apikey='  + key)
      .then(dados =>{ res.render('index', {diplomas:dados.data})})
      .catch(erro => res.status(500).render('erro', {error:erro}))
});

router.get('/processos/:id', function(req, res){
  var id = req.params.id
  axios.get('http://clav-api.dglab.gov.pt/api/classes/c' + id + '/legislacao' + "?apikey=" + key)
       .then(dados =>{
          res.render('processo', {dados: dados.data})
       })
       .catch(erro => res.status(500).render('error', {error: erro}))
})

router.get('/:id', function(req, res){
  var id = req.params.id
  axios.get('http://clav-api.dglab.gov.pt/api/legislacao/' + id + "?apikey=" + key)
       .then(legislacao => {
         axios.get('http://clav-api.dglab.gov.pt/api/legislacao/'+ id +'/processos' + '?apikey=' + key)
              .then(processos => {
                                
                                res.render('legislacao', {dados : legislacao.data, processos : processos.data})
                      })
                      .catch(erro => res.status(500).render('error', {error : erro}))
              })
              .catch(erro => res.status(500).render('error', {error : erro}))
       })



module.exports = router;
