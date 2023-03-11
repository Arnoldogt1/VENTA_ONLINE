'use strict'
const express = require('express');
const {Router} = require('express');
const { billcreate, billlist } = require('../controllers/bill.controllers');

const api = Router();


api.post('/factura', billcreate);
api.get('/listarfacturas', billlist);
module.exports = api; 