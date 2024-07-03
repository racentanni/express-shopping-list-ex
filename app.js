const express = require('express');
const app = express();
const itemsRoutes = require('./routes/items');
const bodyParser = require('body-parser');

//Middleware
app.use(bodyParser.json());
app.use('/items', itemsRoutes);

//Error handling
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

module.exports = app;