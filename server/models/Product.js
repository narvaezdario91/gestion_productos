const mongoose = require('mongoose');
const{Schema} = mongoose;

const ProdutSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    price: {type: Number, required: true},
    stock: {type: Number, required: true}
});

module.exports = mongoose.model('Product', ProdutSchema);