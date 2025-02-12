const Product = require('../../models/products/product.models');

async function getAllProducts(req,res) {
    try{
        const products = await Product.find();
        res.send(products);
    }catch(err){
        res.status(500).send({error: err.message});
    }
}

async function getProductById(req,res){
    try{
        const id = req.params.id;
        const filter = {_id: id};
        const product = await Product.findById(filter);
        res.send(product);
    }catch(err){
        res.status(500).send({error: err.message});
    }
}

async function createProduct(req,res) {
    try{
        const newProduct = new Product(req.body);
        await newProduct.save();

        res.status(201).send(newProduct);
    }catch(err){
        res.send(400).send({error: err.message});
    }
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
}
