var Pub = require('../models/pubs')
var mongoose = require('mongoose')

module.exports.listar = () => {
    return Pub
        .find()
        .exec()
}

module.exports.consultar = id => {
    return Pub
        .findOne({id: id})
        .exec()
}

module.exports.types = () => {
    return Pub
        .distinct("type")
        .exec()
}


module.exports.filtrartypes = (ty) => {
    return Pub
        .find({type : ty})
        .exec()
}

module.exports.filtrarauthors = (aut) => {
    return Pub
    .aggregate([{ $unwind: "$authors" },{ $match: { authors : aut } },{ $group: { id: "$authors", pubs: {$push: {Titulo: "$title"} }} }] )
    .exec()
}

module.exports.filtrarambos = (ty, ano) => {
    return Pub
        .find({type : ty, year : {$gte : ano}})
        .exec()
}

module.exports.autores = () => {
    return Pub
        .aggregate([{$unwind:"$authors"},
            {$project:{name: "$authors"}}, 
            {$group:{id:"$name"}},
            {$sort:{id:1}}
        ])
        .exec();
}