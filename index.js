const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routesCar = require('./routes/cars');
const userRoutes = require('./routes/users');
const methodOverride = require('method-override');
const cors = require('cors');
//swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
//
const port = require('./utils/port');


console.log(process.env.JWTPRIVATEKEY);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(`public`));
app.set('view engine', 'ejs');
app.use('/cars', routesCar);
app.use('/', userRoutes);
app.use(cors());




  




mongoose.connect('mongodb://localhost/cars', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('serverga ulanish hosil qilindi'))
    .catch(err => console.log('Error: ', err))


app.listen(port);

















































