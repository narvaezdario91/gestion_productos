const User = require('../models/User');

const userCtrl ={};

userCtrl.getList = async (req, res) => {
    const userInstanceList = await User.find().populate("products");
    res.json(userInstanceList);
}

userCtrl.getInstance = async (req, res) => {
    const userInstance = await User.findById(req.params.id);
    res.json(userInstance);
}

userCtrl.createInstance = async (req, res) => {
    const userInstance = new User(req.body);
    await userInstance.save();
    res.json({
        'status': 'Usuario guardado'
    });
}

userCtrl.editInstance = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {$set: req.body});
    res.json({
        'status': 'Usuario guardado'
    });
}

userCtrl.deleteInstance = async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({
        'status': 'Usuario eliminado'
    });
}

userCtrl.login = async (req, res) => {

    var userInstance = await User.findOne({'email': req.body.email});
    if(!userInstance){
        userInstance = new User(req.body);
        userInstance = await userInstance.save();
    }
    
    res.json(userInstance);
    
}

module.exports = userCtrl;