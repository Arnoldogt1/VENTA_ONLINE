'use stric'

const Bill = require('../models/bill.model');


const billcreate = async (req, res) =>{
    const {User} = req.body;
    try{
        let bill = await Bill.findOne({User:User});
        if(bill){
            return res.status(400).json({
                message: 'Ya hay una categoria con ese nombre',
                ok: false,
                bills: bill,
            });
        }
        bill = new Bill(req.body);
        bill = await bill.save();

        res.status(200).json({
            message: `${User} se creo correctamente`
        })
    }catch(err){
        throw new Error(err);
    }
};

const billlist = async(req, res) => {
    try{
        const listbill = await Bill.find();
        if(!listbill){
            res.status(404).json({message: 'No se puede generar la factura, llena los datos'});
        }else{
            res.status(200).json({'Facturas emitidas':listbill});
        }
    }catch (err){
        throw new Error(err);
    }
}

const billedit = async(req, res) =>{
    try{
        const id = req.paramas.id;
        const editbill = await Bill.findById(id);
        const billedit = {...req.body};
        if(!editbill){
            res.status(404).send({message: 'No se encontro la factura que buscas'})
        }else{
            const update = await Bill.findByIdAndUpdate(id, billedit, {new: true});
            res.status(200).send({message:'Se actualizarón los datos de la factura', bi:update})
        }
    }catch (err){
        throw new Error(err);
    }
};

const billdelete = async(req, res) =>{

};

module.exports = {
    billcreate,
    billlist,
    billedit,
    billdelete,
}