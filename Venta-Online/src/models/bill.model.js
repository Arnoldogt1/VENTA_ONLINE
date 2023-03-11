'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bill = Schema({
    User:{
        type: String,
        require: true,
    },
    nit:String,
    Date:String,
    Total:String,
});

module.exports = mongoose.model('Factura', bill);