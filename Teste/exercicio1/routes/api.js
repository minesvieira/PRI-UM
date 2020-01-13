var express = require('express');
var router = express.Router();
var Pubs = require('../controllers/pubs')

/* 
GET /api/pubs - Devolve a lista de publicações apenas com os campos "id", "title", "year" e "type"; 
GET /api/pubs/:id - Devolve a informação completa de uma publicação; 
GET /api/types - Devolve a lista de tipos, sem repetições; 
GET /api/pubs?type=YYY - Devolve a lista de publicações que tenham o campo "type" com o valor "YYY"; 
GET /api/pubs?type=YYY&year=AAAA - Devolve a lista de publicações que tenham o campo "type" com o valor "YYY" e o campo "year" com um valor superior a "AAAA"; 
GET /api/autores - Devolve uma lista ordenada alfabeticamente com os nome dos autores ;
GET /api/pubs?autor=AAA - Devolve uma lista com as publicações do autor. 
*/
router.get('/pubs/:id', function(req, res, next) {
  Pubs.consultar(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});

router.get('/pubs', function(req, res, next) {
  if(req.query.type && req.query.year){
    Pubs.filtrarambos(req.query.type, req.query.year)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).jsonp(e))
  } 
  else if (req.query.type){
    Pubs.filtrartypes(req.query.type)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).jsonp(e))
  }
  else if (req.query.authors){
    Pubs.filtrarauthors(req.query.type)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).jsonp(e))
  }
  else {
    Pubs.listar()
      .then(function (dados) {
        response = []
        dados.forEach(element => {
          item = {
            id : element.id,
            title : element.title,
            year : element.year,
            type : element.type
          }
          response.push(item)
        });
        res.jsonp(response)
      })
      .catch(e => res.status(500).jsonp(e))
  }
  
});

router.get('/types', function(req, res, next) {
 Pubs.types()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});

router.get('/autores', function(req, res, next) {
  Pubs.autores()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});

module.exports = router;