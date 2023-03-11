'use strict';

require('dotenv').config
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const database = process.env.DATA_BASE;

const connection = async () =>{
    try{
        await mongoose.connect(database);
        console.log('Conectado correctamanete a la base de datos =)')
    }catch(err){
        throw new Error('Error al iniciar la Base de datos =(');
    }
};

module.exports = {
    connection
}