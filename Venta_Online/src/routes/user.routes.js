'use strict'
const express = require('express');
const {Router} = require('express');
const { usercreate } = require('../controllers/user.controller');
const api = Router();

api.post('/user_create', usercreate)

module.exports = api;