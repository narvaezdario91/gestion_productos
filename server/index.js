const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const { mongoose } = require('./database');

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

//Routes
app.use('/api/products',require('./routes/Product.route'))
app.use('/api/categories',require('./routes/Category.route'))

//Starting Server
app.listen(app.get('port'), ()=>{
    console.log("Server on Port " + app.get('port'));
});