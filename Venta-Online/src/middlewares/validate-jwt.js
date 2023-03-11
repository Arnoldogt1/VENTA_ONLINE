const {request, response} = require('express');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const company = require('../models/users.models');

const validateJWT = async (req = request, res = response, next) =>{
    const token = req.header('x-token');

    //si el token viene vacio
    if(!token) {res.status(401).send({message: 'No hay token en la peticion'});
    }

    try{
        const payload = jwt.decode(token, process.env.SECRET_KEY);
        const comp = await company.findById(payload.id);
        if(payload.exp <= moment().unix()){
            return res.status(500).send({ message: 'El token ha expirado'});
        }
        if(!comp){
            return res.status(401).send({
                message: 'El token no existe en la base de datos',
            });
        }

        req.user = comp;

        next();
    }catch(err){
        throw new Error(err);
    }
}

module.exports = {validateJWT};