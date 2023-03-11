'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const {connection} = require('./src/database/connection');
const routescompany = require('./src/routes/user.routes')
const routesproduc = require('./src/routes/product.routes');
const routescateg = require('./src/routes/category.routes');
const routesbill = require('./src/routes/bill.model.routes');

const port = process.env.PORT;

connection();

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use('/api', routescompany, routesproduc, routescateg, routesbill);

app.listen(port, ()=>{
        console.log(`El servidor está corriendo en el puerto ${port} =D`)
});