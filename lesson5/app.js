const express = require('express');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');

const { PORT } = require('./configs/constants');

mongoose.connect('mongodb://localhost:27017/inoxoft');

const { authRouter, carRouter, userRouter } = require('./routers');

const app = express();
const staticPath = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', staticPath);

app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use(_errorHandler);

app.listen(PORT, () => {
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
