'use stric'

const Product = require('../models/product.models');


//Para crear el producto, lo hice de está manera, llamando a todo el modelo
const productcreate = async(req,res)=>{
    const {name, description, price, dicount, stock} = req.body;
    try{
        let producto = await Product.findOne({name});
        if(producto){
            return res.status(400).send({
                message:`El producto ${name} ya existe`,
                producto:producto,
            });
        }
        producto = new Product({
            name: name, 
            description: description,
            price: price,
            dicount: dicount,
            stock: stock,

          });
        producto = await producto.save();
        return res.status(200).send({
            message: `El producto ${name} se ha creado exitosamente`,
            producto: producto,
          });
    }catch(err){
        throw new Error(err);
    }
};

/*const productcreate = async(req, res) =>{
    const  {productname} = req.body;
    try{
        let product = await Product.findOne({productname:productname});
        if(product){
            return res.status(400).send({
                message: 'Ya hay un producto con este nombre',
                ok: false,
                pro: product,
            });    
        }
        product = new Product(req.body);
        product = await product.save();

        res.status(200).send({
            message: `${productname} se creo correctamente`, product,
        });
    }catch(err){
        throw new Error(err);        
    }
};*/



//Esto para listar los productos
const productList = async (req, res) => {
    try{
        const listproduct = await Product.find();
        if(!listproduct){
            res.status(404).json({message: 'No se encontro ningun producto'});

        }else{
            res.status(200).json({'Productos encontrados': listproduct});
        }
    }catch (err){
        throw new Error (err);
    }
};



//Editar el producto
const productEdit = async (req, res) => {
    try{
        const id = req.params.id;
        const producedit = {...req.body};
        const editprod = await Product.findById(id);
        if(!editprod){
            res.status(404).send({message: 'No se encontro un productodo con este id'});
        }else{
            const update = await Product.findByIdAndUpdate(id, producedit, {new: true});
            res.status(200).send({message: 'El producto ha sido actualizado correctamente', produ: update })
        }
    }catch(err){
        throw new Error(err);
    }
};


//Eliminar el producto
const productDelete = async (req, res) => {
    try{
        const id = req.params.id;
        const result = await Product.findByIdAndDelete(id);
        res.status(200).send({message:'Producto eliminado correctamente'})
    }catch(err){
        throw new Error(err);
    }
};


//con esto buscamos un producto por su nombre
const buscarproducto = async (req, res) => {
    const { name } = req.body;
  
    const productoEncontrado = await Product.findOne({name:name});
    if (!productoEncontrado) {
      res.status(404).json({ message: 'No se encontró ningún producto' });
    } else {
      res.status(200).json({ message: 'Producto encontrado', producto: productoEncontrado });
    }
  };
  


//con esto buscamos los productos más vendidos
const prdmasvendidos = async (req, res) =>{
    let listproduct = await Product
    .find()
    .sort({stock:1})
    res.json({
        message: 'Productos más vendidos', listproduct
    })
};


//con este codigo buscamos los productos agotados
const prodagotados = async (req, res) =>{
    const exhausted = await Product.find({stock:0});
    if(exhausted.length === 0){
        res.status(400)
        .send({message:'Lo sentimos, los productos'});
    }else{
        res.status(200).json({'Lista de productos agotados:':exhausted});
    }
};

   

//exportaciones
module.exports = {
    productcreate,
    productList, 
    productEdit,
    productDelete,
    buscarproducto,
    prdmasvendidos,
    prodagotados,
};