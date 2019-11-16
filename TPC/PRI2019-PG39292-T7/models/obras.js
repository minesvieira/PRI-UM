const mongoose = require('mongoose')

var obraSchema = new mongoose.Schema({
    _id : String,
    nome : String,
    desc: String,
    anoCriacao : Number,
    periodo : String,
    compositor : String,
    duracao : String
});

module.exports = mongoose.model('obras', obraSchema)