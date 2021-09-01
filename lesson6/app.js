const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { authRouter, carRouter, userRouter } = require('./routers');

mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use(_errorHandler);

app.listen(process.env.PORT, () => {
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
