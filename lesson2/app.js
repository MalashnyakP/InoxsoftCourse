const express = require('express');
const expressHbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');
const util = require('util');

const statusCodes = require('./configs/statusCodesENUM');
const { PORT } = require('./configs/config');
const users = require('./dataBase/users');

const app = express();
const staticPath = path.join(__dirname, 'static');
const dbPath = path.join(__dirname, 'dataBase', 'users.js');

const writeFilePromisify = util.promisify(fs.writeFile);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', staticPath);

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:user_id', (req, res) => {
    const { user_id } = req.params;
    const query = req.query;

    res.json(users[user_id]);
});

app.post('/auth', (req, res) => {
    const { email, password } = req.body;

    console.log(email, password)
    const user = users.find(user => user.email === email);

    if (!user) {
        res.status(statusCodes.NOT_FOUND).end('User not found');
        return;
    }

    //res.redirect('/users/2')

    res.json(user);
});

app.get('/auth', (req, res) => {
    res.render('auth');
});

app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log(emailValidator.test(email), email)
    if(!emailValidator.test(email)){
        res.status(statusCodes.BAD_REQUEST).end('Enter valid email');
    }
 
    console.log(email, password)
    const user = users.find(user => user.email === email);

    if(!user){
        users.push({email, password});
        const usersJSON = 'module.exports = ' + JSON.stringify(users);         
        writeFilePromisify(dbPath, usersJSON);
        res.redirect('/users');
        return;
    }

    res.status(statusCodes.CONFLICT).end('User with thie email already exists');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.listen(PORT, () => {
});
