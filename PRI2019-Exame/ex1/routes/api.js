var express = require('express');
var router = express.Router();
var Musicas = require('../controllers/musicas')

/* 
GET /api/obras - Devolve a lista de obras musicais apenas com os campos "id", "titulo", "tipo" e "compositor";
GET /api/obras/:id - Devolve a informação completa de uma obra (considere para id o campo id que tem valores "m1", "m2", ... "mn";
GET /api/compositores - Devolve apenas uma lista com os nomes dos compositores, sem repetições e ordenada alfabeticamente;
GET /api/obras?by=compositor - Devolve a lista de obras agrupadas por compositor, ou seja, devolve uma lista de compositores em que a cada compositor está associada uma lista de obras (coloque apenas o id e o título da obra);
GET /api/obras?by=instrumento - Devolve a lista de obras agrupadas por instrumento, ou seja, devolve uma lista de instrumentos em que a cada instrumento está associada uma lista de obras (coloque apenas o id e o título da obra);
GET /api/obrasQuant - Devolve uma lista de obras musicais com os seguintes campos: id, titulo, partituras (número de partituras disponíveis);
*/

router.get('/obras/:id', function(req, res, next) {
    Musicas.consultar(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).jsonp(e))
  });

router.get('/obras', function(req, res, next) {
    if(req.query.compositor){
        Musicas.filtrarcompositor(req.query.compositor)
          .then(dados => res.jsonp(dados))
          .catch(e => res.status(500).jsonp(e))
      } 
    else if (req.query.instrumento){
        Musicas.filtrarinstrumento(req.query.instrumento)
          .then(dados => res.jsonp(dados))
          .catch(e => res.status(500).jsonp(e))
      }
    else {
      Musicas.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
     }
    });

router.get('/compositores', function(req, res, next) {
    Musicas.compositores()
        .then(dados => res.jsonp(dados))
        .catch(e => res.status(500).jsonp(e))
       });

router.get('/obrasQuant',function(req,res){
    var id = req.params.id
    Musicas.obrasquanti()
        .then(dados => {
            dados.sort()
            res.jsonp(dados)
        })
        .catch(erro => res.status(500).jsonp(erro))
     })

module.exports = router;