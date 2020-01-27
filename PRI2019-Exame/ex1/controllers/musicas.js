var Musica = require('../models/musicas')
var mongoose = require('mongoose')

module.exports.listar = () => {
    return Musica
        .find({}, {"_id" : 1, "titulo": 1 , "tipo": 1, "compositor": 1})
        .exec()
}

module.exports.consultar = id => {
    return Musica
        .findOne({_id: id})
        .exec()
}

module.exports.compositores = () => {
    return Musica
        .distinct("compositor").sort()
        .exec()
}

module.exports.filtrarcompositor = () => {
    return Musica
        .aggregate([{$group:{_id:"$compositor", "obras":{$push:{"_id":"$_id", "titulo": "$titulo"}}}}])
        .exec()
}

module.exports.filtrarinstrumento = (inst) => {
    return Musica
    .aggregate([{$unwind:"$instrumentos.instrumento"},{$group:{_id:"$instrumentos.instrumento.designacao", "obra":{$push:{"_id":"$_id", "titulo": "$titulo"}}}}])
    .exec();
}

module.exports.obrasquanti = () =>{
    return Musica
    .aggregate([
        {$project: {_id:true,titulo:true,partituras: { $cond: { if: { $isArray: "$instrumentos.instrumento" }, then: { $size: "$instrumentos.instrumento" }, else: {$cond: { if: { "instrumentos": {exists:true}}, then: 1, else: 0} }}}}}] )
        .exec()
}