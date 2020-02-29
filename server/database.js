const mongoose = require('mongoose');

const URI = 'mongodb://localhost/gestion_productos';

mongoose.connect(URI)
    .then(db=> console.log('DB is Connected'))
    .catch(err=> console.error(err));


module.exports = mongoose;