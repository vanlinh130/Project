const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');
const employeeRoutes = require('./routes/employee')

const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler')

const app = express();

// Ket noi server co so du lieu
mongoose.connect(config.DATABASE_CONNECT_URL, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
})

// Khai bao cac middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());

app.use(authJwt());
app.use(errorHandler);

// khai bao route
app.use(`${config.API}/accounts`, employeeRoutes);

// Tao ra server lang nghe Post
app.listen(config.PORT, err => {
    console.log('Magic happens on post awesome' + config.PORT);
})
