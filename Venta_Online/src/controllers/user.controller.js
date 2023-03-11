'use strict'

const Users = require('../models/user.model');
const bcrypt = require('bcrypt')

const usercreate = async (req, res) => {
    const {email, password} = req.body;
    try{
        let usr = await Users.findOne({email:email});
        if(usr){
            return res.status(400).send({
                message: 'Ya existe alguien con este email',
                ok: false,
                usr: usr,
            });
        }
        usr = new Users(req.body);

        const salto = bcrypt.genSaltSync();
        usr.password = bcrypt.hashSync(password, salto);

        usr = await usr.save();


        res.status(200).send({
            message: `Usuario ${email} se creo correctamente`,
            usr: usr,
        });


    }catch(err){
        throw new Error (err);
    }
};

/*const userlist = async(req, res) =>{

};

const useredit = async(req, res) =>{

};

const userdelete = async(req, res) =>{

};*/

module.exports = {
    usercreate, /*userlist, useredit, userdelete*/
}