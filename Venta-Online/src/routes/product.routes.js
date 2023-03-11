'use strict'
const express = require('express');
const {Router} = require('express');
const { productcreate, productList, productEdit, productDelete, buscarproducto, prdmasvendidos, prodagotados } = require('../controllers/product.controller');

const api = Router();

api.post('/create_product', productcreate); 
api.get('/listar_product', productList);
api.put('/editar_product/:id', productEdit);
api.delete('/delete_product/:id', productDelete);
api.get('/buscar_product', buscarproducto);
api.get('/vermasvenidos', prdmasvendidos);
api.get('/agotados', prodagotados);

module.exports = api;