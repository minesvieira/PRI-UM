const mongoose = require('mongoose')

var musicaSchema = new mongoose.Schema({
  _id: {type: String, required:true},
  titulo: String,
  tipo: String,
  compositor: String
});

module.exports = mongoose.model('musicas', musicaSchema)