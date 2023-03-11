'use strict'
const express = require('express');
const {Router} = require('express');
const { usercreate, userEdit, userDelete, userList, userLogin } = require('../controllers/users.controller');
const api = Router();
const {check} = require('express-validator');
const {validateParams} = require('../middlewares/validate-params');
const { validateJWT } = require('../middlewares/validate-jwt');


api.post('/create-user', /*[
    check('companylogin', 'companylogin es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña debe ser mayor a 8 digitos').isLength({min:8}), validateParams,
],*/usercreate);

api.put('/edit_User/:id',/*[
    check('companylogin', 'companylogin es obligatorio').not().isEmpty(), validateParams,
],*/ userEdit);

api.delete('/delet-User/:id', validateJWT, userDelete);
api.get('/listar_User', userList);
api.post('/login', userLogin);
module.exports = api;