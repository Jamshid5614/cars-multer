const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const routesCar = require('./routes/cars');
const CarsModel = require('./models/cars');
const userRoutes = require('./routes/users');
const config = require('config');
const path = require('path');
const port = 3000;
const upload = require('./utils/multer');
// const upload = multer({ dest: 'uploads/' });

// if (!config.get('JwtPrivateKey')) {
//     console.error("JIDDIY XATO: JwtPrivateKey o'zgaruvchisi aniqlanmadi");
//     process.exit(1);
// }

app.use(express.static('public'))
app.use(express.json());
app.set('view engine', 'ejs');
app.use('/cars', routesCar);
app.use('/', userRoutes);
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'jnhfbh54fhu8ho2478oqh8ovugvb%^£"&$£H$B6g467r4grg378GB&347tg3743bEG£&6f£&EG',
    resave: false,
    saveUninitialized: true,
}));
app.use(function (req, res, next) {
    res.locals.isAdmin = true;
    res.locals.user = null;
    next();
});
// app.use(express.st);


app.get('/', (req, res) => {
    res.redirect('/cars');
});

app.get('/cars', async (req, res) => {
    const cars = await CarsModel.find();
    res.render('index', { cars: cars });
});


// add file
app.post('/file', upload.single('image'), (req, res, next) => {
    res.send(req.file);
});

app.get('/file', (req, res) => {
    res.render('addFile');
})


mongoose.connect('mongodb://localhost/cars', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('serverga ulanish hosil qilindi'))
    .catch(err => console.log('Error: ', err))


app.listen(port);

















































