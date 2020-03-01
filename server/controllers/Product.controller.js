const Product = require('../models/Product');

const productCtrl ={};

productCtrl.getProducts = async (req, res) => {
    const productInstanceList = await Product.find();
    res.json(productInstanceList);
}

productCtrl.getProduct = async (req, res) => {
    const productInstance = await Product.findById(req.params.id);
    res.json(productInstance);
}

productCtrl.createProduct = async (req, res) => {
    const productInstance = new Product(req.body);
    await productInstance.save();
    res.json({
        'status': 'Producto guardado'
    });
}

productCtrl.editProduct = async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, {$set: req.body});
    res.json({
        'status': 'Producto modificado'
    });
}

productCtrl.deleteProduct = async (req, res) => {
    await Product.findByIdAndRemove(req.params.id);
    res.json({
        'status': 'Producto eliminado'
    });
}

module.exports = productCtrl;