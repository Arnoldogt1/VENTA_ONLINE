'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = Schema({
    name:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: true,
    },
    price:{
        type: String,
        require: true,
    },
    dicount:{
        type: String,
        require: true,
    },
    stock:{
        type: String,
        require: true,
    },

});


module.exports = mongoose.model('productos', product);