const mongoose = require('mongoose')

var pubSchema = new mongoose.Schema({
    type: String,
    id: mongoose.Schema.Types.ObjectId,
    authors: Array,
    editors: Array,
    title: String,
    booktitle: String,
    address: String,
    year: Number,
    month: Number,
    doi: String,
  });

module.exports = mongoose.model('pubs', pubSchema)