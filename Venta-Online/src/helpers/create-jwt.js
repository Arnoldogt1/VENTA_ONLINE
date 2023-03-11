const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET_KEY;

const generateJWT = async(id, companylogin) =>{
    const payload = {id, companylogin};
    try{
        const token = await jwt.sign(payload, secret,{
            expiresIn: '3h',
        });
        return token;
    }catch(err){
        throw new Error(err);
    }
}

module.exports = {
    generateJWT
};