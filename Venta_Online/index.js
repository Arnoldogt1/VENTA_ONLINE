'use strict'

require('dotenv').config();
const express = require('express');
const app = express();
const {connection} = require('./src/database/connection');
const userroutes = require('./src/routes/user.routes');
const port = process.env.PORT;

connection();

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use('/api', userroutes);

app.listen(port, ()=>{
    console.log(`El servidor está corriendo en el puerto ${port} =D`)
});