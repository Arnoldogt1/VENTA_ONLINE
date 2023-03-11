/*const {request, response} = require('express');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const user = require('../models/user.model');

const validateJWT = async (req = request, res = response, next) =>{
    const token = req.header('x-token');

    if(!token) {res.status(401).send({message: 'No hay token en la peticion'});
    }

    try{
        const payload = jwt.decode(token, process.env.SECRET_KEY);
        const usr = await user.findById(payload.id);
        if(payload.exp <= moment().unix()){
            return res.status(500).send({message: 'El token ha expirado'});
        }
        if(!usr){
            return res.status(401).send({
                message: 'El token no existen en la base de datos',
            });
        }

        req.user = usr;

        next();
    }catch(err){
        throw new Error(err);
    }
}

module.exports = {validateJWT};*/