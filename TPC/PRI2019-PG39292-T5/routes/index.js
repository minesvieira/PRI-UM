var express = require('express')
var router = express.Router()
var jsonfile = require('jsonfile')
var nanoid = require('nanoid')

var myBD = __dirname + "/../data/alunos.json"

router.get('/alunos', function(req, res) {
  jsonfile.readFile(myBD, (erro,dados) => {
    if(!erro){
      res.render('index', {lista:dados})
    }
    else{
      res.render('error', {error: erro})
    }
  })
})

router.get('/alunos/:idAluno', function(req, res) {
  var id = req.params.idAluno
  jsonfile.readFile(myBD, (erro,dados) => {
    if(!erro){
      var alunoid = dados.find(c => c.identificador == id)
      if(alunoid){
        res.render('notasAluno', {aluno:alunoid})
      }
    }
    else{
      res.render('error', {error: erro})
    }
  })
})

router.post('/alunos', function(req, res) {
  var registo = req.body
  registo ['identificador'] = nanoid()
  registo["notas"] = [];
  jsonfile.readFile(myBD, (erro,dados) => {
    if(!erro){
      dados.push(registo)
      jsonfile.writeFile(myBD, dados, erro => {
        if(erro) console.log(erro)
        else console.log('Aluno registado com sucesso.')
      })
    }
    res.render('index', {lista: dados})
  })
})

router.post('/alunos/:idAluno/notas', function(req, res) {
  var registo = req.body
  var id = req.params.idAluno
  jsonfile.readFile(myBD, (erro,dados) => {
    if(!erro){
      var aluno = dados.find(c => c.identificador == id)
      aluno['notas'].push(registo)
      jsonfile.writeFile(myBD, dados, erro => {
        if(erro) console.log(erro)
        else console.log('Nota registada com sucesso.')
      })
    }
    res.render('notasAluno', {aluno:aluno})
  })
})

router.delete('/alunos/:idAluno', function(req, res) {
  var id = req.params.idAluno
  jsonfile.readFile(myBD, (erro,dados) => {
    if(!erro){
      var index = dados.findIndex(c => c.identificador == id)
      if(index > -1){
        dados.splice(index,1)
        jsonfile.writeFile(myBD, dados, erro => {
          if(!erro) console.log(erro)
          else console.log('Aluno removido com sucesso.')
        })
      }
    }
    res.render('index', {lista: dados})
  })
})

router.delete('/alunos/:idAluno/notas/:indicador', function(req, res) {
  var id = req.params.idAluno
  var indica = req.params.indicador
  jsonfile.readFile(myBD, (erro,dados) => {
    if(!erro){ 
      var indexaluno = dados.findIndex(c => c.identificador == id)
      if(indexaluno > -1){ console.log("Entrou")
        var indexnota = dados[indexaluno]["notas"].findIndex(c => c.indicador == indica) //retorna o indice do primeiro elemento em uma matriz
        dados[indexaluno]["notas"].splice(indexnota,1) //splice () adiciona / remove itens de / para uma matriz e retorna os itens removidos
        jsonfile.writeFile(myBD, dados, erro => {
          if(!erro) console.log(erro)
          else console.log('Nota removida com sucesso.')
        })
      }
    }
    res.render('notasAluno', {aluno:dados})
  })
})

module.exports = router;
