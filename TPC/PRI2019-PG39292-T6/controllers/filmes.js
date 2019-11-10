var Filme = require('../models/filmes')


//Devolve a lista de alunos
module.exports.listar = () => {
    return Filme
        .find()
        .exec()
}

module.exports.consultar = id => {
    return Filme
        .findOne({_id: id})
        .exec()
}

module.exports.inserir = filme => {
    var novo = new Filme(filme)
    return novo.save()
}

module.exports.remover = id => {
    return Filme
        .findByIdAndRemove(id)
}