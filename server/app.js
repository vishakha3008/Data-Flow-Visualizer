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

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'GET,PATCH,DELETE,POST,PUT');
//         return res.status(200).json({});
//     }
//     next();
// });


/*app.post('/api/auth/google', async (req, res) => {
    try {
        const { googleId, email } = req.body;
        let user = await User.findOne({ googleId });

        if (!user) {
            user = new User({ googleId, email, role: 'viewer' });
            await user.save();
        }

        const roleMapping = await RoleMapping.findOne({ role: user.role });
        user.permissions = roleMapping ? roleMapping.permissions : [];

        res.status(200).json({ message: 'User authenticated and saved successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});*/

// Use the router for the /flows route
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
