var Obra = require('../models/obras.js')

//Devolve a lista de compositores
module.exports.listar = () => {
    return Obra
        .find()
        .exec()
}

module.exports.listarCompositores = () => {
    return Obra
    .distinct('compositor')
    .exec()
}

module.exports.listarCompositoresNome = comp => {
    return Obra
    .aggregate([{ $unwind: "$compositor" },{ $match: { compositor : comp } },{ $group: { _id: "$compositor",obras: {$push: {Nome: "$nome"} }} }] )
    .exec()
}

module.exports.listarP = p => {
    return Obra
        .find({periodo: p})
        .exec()
}

module.exports.listarA = a => {
    return Obra
        .find({anoCriacao: a })
        .exec()
}

module.exports.listarC = c => {
    return Obra
        .find({compositor: c })
        .exec()
}