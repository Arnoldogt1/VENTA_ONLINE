'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category = Schema({
    categoria: String,
    precio: String,
    cantidad: String,
});

module.exports = mongoose.model('category', category);