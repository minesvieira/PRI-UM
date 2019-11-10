var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("entrei 1")
  axios.get('http://localhost:3005/api/filmes')
    .then(dados => {
        res.render('lista-filmes', { lista: dados.data });
    })
    .catch(erro => {
        res.render('error', {error: erro})
    })
})

router.get('/inserir', function(req, res) {
    res.render('form-filme')
})

router.get('/:idFilme', function(req, res) {
    console.log("entrei")
    axios.get('http://localhost:3005/api/filmes/' + req.params.idFilme)
    .then(dados => {
        console.log(dados.data)
        res.render('info-filme', { filme: dados.data });
    })
    .catch(erro => {
        res.render('error', {error: erro})
    })
})

router.post('/', function(req, res) {
console.log(req.body)
    let filme = {
        title: req.body.title,
        year: req.body.year,
        cast: req.body.cast.split(","),
        genres: req.body.genres.split(","),
    }
    axios.post('http://localhost:3005/api/filmes', filme) 
    .then(dados => {
        res.redirect('/')
    })
    .catch(erro => {
        res.render('error', {error: erro})
    })
})

router.delete('/:idFilme', function(req, res) {
    console.log("entrei")
    axios.delete('http://localhost:3005/api/filmes/' + req.params.idFilme)
    .then(dados => {
        console.log(dados.data)
        res.json(dados)
    })
    .catch(erro => {
        res.render('error', {error: erro})
    })
})


module.exports = router;