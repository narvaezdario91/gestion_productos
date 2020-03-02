const Category = require('../models/Category');
const User = require('../models/User');

const categorytCtrl ={};

categorytCtrl.getList = async (req, res) => {

    var categoryInstanceList;
    const userInstance  = await User.findById(req.query.user).populate("categories");

    if(userInstance){
        categoryInstanceList = userInstance.categories;
    }else{
        categoryInstanceList = await Category.find().populate("products");
    }

    res.json(categoryInstanceList);
}

categorytCtrl.getInstance = async (req, res) => {
    const categoryInstance = await Category.findById(req.params.id);
    res.json(categoryInstance);
}

categorytCtrl.createInstance = async (req, res) => {
    const userInstance = await User.findById(req.body.userId);
    const categoryInstance = new Category(req.body);
    await categoryInstance.save();

    await userInstance.categories.push(categoryInstance);
    await userInstance.save();

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