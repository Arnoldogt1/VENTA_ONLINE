'use strict'

const Users = require('../models/users.models');
const bcrypt = require('bcrypt');
const {generateJWT} = require('../helpers/create-jwt')


// Crea sesión de una empresa y solo los que tengan rol ADMIN pueden crear usuarios, para que eso pase, antes cree dos dos ADMINS
const usercreate = async (req, res) => {
    if(req.user.rol === 'ADMIN'){
    const {username, password} = req.body;
    try{
        let usr = await Users.findOne({username});
        if(usr){
            return res.status(400).send({
                message: 'Ya existe alguien con este email',
                ok: false,
                user: usr,
            });
        }
        usr = new Users(req.body);
        
        const saltos = bcrypt.genSaltSync();
        usr.password = bcrypt.hashSync(password, saltos);

        usr = await usr.save();

        const token = await generateJWT(usr.id);

        res.status(200).send({
            message: `${username} se creo correctamente`, token: token,
        })
        
    }catch (err){
        throw new Error(err);
    }
}else{
    return res.status(500).send({message:'este usuario no tiene permisos de ADMIN'});
}
};




//Con esté codigo listamos todos los usuarios que están registrados
const userList = async (req, res) => {
    try{
        const listus = await Users.find();
        if(!listus){
            res.status(404).json({message: 'No se encontro ningun usuario, revisa bien los parametro.'});
        }else{
            res.status(200).json({'Usuarios encontrados': listus});
        }
    }catch(err){
        throw new Error (err);
    }
};


// con este código editamos los parametros de un usuario
const userEdit = async (req, res) =>{
    try{
        const id = req.params.id
        const edituser = {...req.body}

        edituser.password = edituser.password
        ? bcrypt.hashSync(edituser.password, bcrypt.genSaltSync())
        : edituser.password;
        const changes = await Users.findByIdAndUpdate(id, edituser,{
            new: true,
        });
        if(changes){
            return res.status(200).json({message: 'Los datos se actualizarón correctamente', edituser});
        }else{
            res.status(404).send({message: 'El usuario que busacas no esta en la base de datos'})
        }
    }catch (err){
        throw new Error(err);
    }
};



//eliminar usuarios, esto solo lo hacen los que tiene rol ADMIN
const userDelete = async (req, res) =>{
    if(req.user.rol === 'ADMIN'){
    try{
        const id = req.params.id;
        const deleteuser = await Users.findByIdAndDelete(id);
        return res.status(200).json({message: `${id} se elimino correctamente`, deleteuser});
    }catch(err){
        throw new Error(err);
    }
}else{
    return res.status(500).send({message:'este usuario no tiene permisos de ADMIN'});
}
};


//Para que se registren toddos
const userLogin = async (req, res) =>{
    const {email, password} = req.body;
    try{
        const user = await Users.findOne({email});
        if(!user){
        return res.status(400).send({ok: false, message: 'El usuario no existe, comprueba tus datos'});
        }
        const validPassword = bcrypt.compareSync(
            password, user.password
        );
        if (!validPassword){
            return res.status(400).send({ok: false, message:'La contraseña es incorrecta'});
        }
        const token = await generateJWT(user.id, user.username, user.email);
        res.json({
            ok: true, id:user.id, usename:user.username, email:user.email, token,
        });
    }catch (err){
        throw new Error(err);
    }
};



//esportaciones
module.exports = {
    usercreate, 
    userList, 
    userEdit, 
    userDelete, 
    userLogin};