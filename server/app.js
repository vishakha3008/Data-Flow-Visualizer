require('dotenv').config();
const express = require('express');

const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
require('./api/middleware/isLoggedIn');
const User = require('./api/models/user');
const Node = require('./api/models/nodes');

const RoleMapping = require('./api/models/roleMapping');
const flowsRoutes = require('./api/routes/flows');  // Import the router

// Connect to MongoDB
mongoose.connect('mongodb+srv://Team18:Team18pwd@node-rest-canvas.lystdp9.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

mongoose.Promise = global.Promise;


app.use(passport.initialize());


app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use('/flows', flowsRoutes);

// Error handling middleware
app.use(function (req, res, next) {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
});

app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
