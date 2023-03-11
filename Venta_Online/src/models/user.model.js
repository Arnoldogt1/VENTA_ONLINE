'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = Schema({
    Username:{
        type: String,
        require: true,
    },
    Email:{
        type: String, 
        require: true,
    },
    Password: String,
    Rol: String,
})

module.exports = mongoose.model('createuser', user)