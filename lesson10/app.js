const express = require('express');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');

require('dotenv').config();

const { config } = require('./configs');
const { authRouter, carRouter, userRouter } = require('./routers');

mongoose.connect(config.DB_CONNECT_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use(_errorHandler);

app.listen(config.PORT, () => {
    console.log('Listening to 5000');
});

// eslint-disable-next-line no-unused-vars
function _errorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
}
