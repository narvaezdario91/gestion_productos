const mongoose = require('mongoose');
const{Schema} = mongoose;

const UserSchema = new Schema({
    email: {type: String, required: true},
    categories:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);