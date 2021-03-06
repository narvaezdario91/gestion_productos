const Product = require('../models/Product');
const Category = require('../models/Category');

const productCtrl ={};

productCtrl.getList = async (req, res) => {
    var productInstanceList;
    const categoryInstance = await Category.findById(req.query.category).populate("products");

    if(categoryInstance){
        productInstanceList = categoryInstance.products; 
    }else{
        productInstanceList = await Product.find();
    }
    
    res.json(productInstanceList);
}

productCtrl.getInstance = async (req, res) => {
    const productInstance = await Product.findById(req.params.id);
    res.json(productInstance);
}

productCtrl.createInstance = async (req, res) => {
    const categoryInstance = await Category.findById(req.body.categoryId);
    const productInstance = new Product(req.body);
    await productInstance.save();
    
    await categoryInstance.products.push(productInstance);
    await categoryInstance.save();

    res.json({
        'status': 'Producto guardado'
    });

}

productCtrl.editInstance = async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, {$set: req.body});
    res.json({
        'status': 'Producto modificado'
    });
}

productCtrl.deleteInstance = async (req, res) => {
    await Product.findByIdAndRemove(req.params.id);
    res.json({
        'status': 'Producto eliminado'
    });
}

module.exports = productCtrl;