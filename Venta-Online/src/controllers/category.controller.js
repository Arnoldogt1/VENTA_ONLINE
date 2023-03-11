'use strict'

const Category = require('../models/category.models');



//codigo para crear categoria
const categorycreate = async(req, res)=>{
    const {categoria} = req.body;
    try{
        let ctg = await Category.findOne({categoria:categoria});
        if(ctg){
            return res.status(400).send({
                message: 'Ya hay una categoria con ese nombre',
                ok: false,
                cate: ctg,
            });
        }
        ctg = new Category(req.body);
        ctg = await ctg.save();

        res.status(200).send({
            message: `${categoria} se creo correctamente`, ctg,
        });
    }catch(err){
        throw new Error(err);
    }
};


//codigo para listar categorias
const categoryList = async(req, res) => {
    try{
        const listctg = await Category.find();
        if(!listctg){
            res.status(404).json({message: 'no hay nada en categorias'});
        }else{
            res.status(200).json({'Categorias encontradas': listctg});
        }
    }catch (err){
        throw new Error (err);
    }
};


//codigo para editr categoria
const categoryEdit = async(req, res) => {
    try{
        const id = req.params.id;
        const ctgedit = {...req.body};
        const editctg = await Category.findById(id);
        if(!editctg){
            res.status(404).send({message: 'No se encontro'})
        }else{
            const update = await Category.findByIdAndUpdate(id, ctgedit, {new: true});
            res.status(200).send({message: 'La categoria se actualizo correctamente'});
        }
    }catch (err){
        throw new Error (err);
    }
};


//codigo para eliminar una categoria
const categoryDelete = async(req, res) => {
    try{
        const id = req.params.id;
        const result = await Category.findByIdAndDelete(id);
        res.status(200).send({message:'Categoria eliminada correctamente'});
    }catch(err){
        throw new Error(err);
    }
};


//exportaciones
module.exports ={
    categorycreate,
    categoryList,
    categoryEdit,
    categoryDelete,
};