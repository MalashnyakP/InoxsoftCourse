const cors = require('cors');
const express = require('express');
const expressFileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

require('dotenv').config();

const { config } = require('./configs');
const cronJobs = require('./crons');
const { authRouter, carRouter, userRouter } = require('./routers');

mongoose.connect(config.DB_CONNECT_URL);

const app = express();

app.use(cors({ origin: _configureCors }));

app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // винести в конфіги
    max: 1000
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());
app.use(helmet());

if (process.env.DEV === 'dev') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use(_errorHandler);

app.listen(config.PORT, () => {
    console.log('Listening to 5000');
    cronJobs();
});

// eslint-disable-next-line no-unused-vars
function _errorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
}

function _configureCors(origin, callback) {
    const whiteList = config.ALLOWED_ORIGIN.split(';');

    if (!origin) {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new Error('Origin not allowed.'), false);
    }

    return callback(null, true);
}
