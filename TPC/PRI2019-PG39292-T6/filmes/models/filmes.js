const mongoose = require('mongoose')

var filmeSchema = new mongoose.Schema({
    title: String, 
    year: Number,
    cast: Array,
    genres: Array
});

module.exports = mongoose.model('filme', filmeSchema)