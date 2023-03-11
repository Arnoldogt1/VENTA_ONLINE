'use strict'
const express = require('express');
const {Router} = require('express');
const { categorycreate, categoryList, categoryDelete, categoryEdit } = require('../controllers/category.controller');

const api = Router();

api.post('/create_category', categorycreate); 
api.get('/listar_categoy', categoryList);
api.put('/editar_ctg/:id', categoryEdit)
api.delete('/delete_ctg/:id', categoryDelete)

module.exports = api;