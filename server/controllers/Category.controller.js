const Category = require('../models/Category');

const categorytCtrl ={};

categorytCtrl.getList = async (req, res) => {
    const categoryInstanceList = await Category.find().populate("products");
    res.json(categoryInstanceList);
}

categorytCtrl.getInstance = async (req, res) => {
    const categoryInstance = await Category.findById(req.params.id);
    res.json(categoryInstance);
}

categorytCtrl.createInstance = async (req, res) => {
    const categoryInstance = new Category(req.body);
    await categoryInstance.save();
    res.json({
        'status': 'Categoria guardada'
    });
}

categorytCtrl.editInstance = async (req, res) => {
    await Category.findByIdAndUpdate(req.params.id, {$set: req.body});
    res.json({
        'status': 'Categoria guardada'
    });
}

categorytCtrl.deleteInstance = async (req, res) => {
    await Category.findByIdAndRemove(req.params.id);
    res.json({
        'status': 'Categoria eliminada'
    });
}

module.exports = categorytCtrl;