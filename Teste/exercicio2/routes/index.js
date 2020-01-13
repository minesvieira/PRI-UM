var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/tipologias')
    .then(dados => res.render('index',{tipologias: dados.data}))
    .catch(error => res.render('error',{ message: 'error: ' + error})) 
});

router.get('/desc/:id', (req,res) => {
  var codigo = req.params.id
    axios.get('http://clav-api.dglab.gov.pt/api/tipologias/' + codigo + '/elementos')
    .then(dados => {
      axios.get('http://clav-api.dglab.gov.pt/api/tipologias/' + codigo)
        .then(dados2 => {
          res.render('desc',{tipologias: dados.data, infoProcesso: dados2.data[0]})}
          )
        .catch(error => res.render('error',{message: 'error: ' + error}))
    })
    .catch(error => res.render('error',{message: 'error: ' + error}))
})

module.exports = router;
