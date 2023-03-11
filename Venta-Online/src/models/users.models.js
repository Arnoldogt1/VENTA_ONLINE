'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userShema = Schema({
    username:{
        type: String,
        require: true,
    },
    email: String,
    rol: String,
    password: String,
})

module.exports = mongoose.model('users_register', userShema);