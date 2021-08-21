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

app.post('/auth', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);

    if (!user) {
        res.status(statusCodes.NOT_FOUND).end('User not found');
        return;
    }

    res.render('userCabinet', {name: '', email, password});
});

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailValidator.test(email)){
        res.status(statusCodes.BAD_REQUEST).end('Enter valid email.');
        return;
    }

    if(password.length < 5){
        res.status(statusCodes.BAD_REQUEST).end('Enter valid password. Minimun length 5 characters.');
        return;
    }
 
    const user = users.find(user => user.email === email);

    if(!user){
        users.push({name, email, password});
        const usersJSON = 'module.exports = ' + JSON.stringify(users);         
        writeFilePromisify(dbPath, usersJSON);
        res.render('userCabinet', {name, email, password});
        return;
    }

    res.status(statusCodes.CONFLICT).end('User with thie email already exists');
});

app.get('/users/:user_id', (req, res) => {
    const { user_id } = req.params;

    res.render('userCabinet', {name: users[user_id].name, email: users[user_id].email, password: users[user_id].password});
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/auth', (req, res) => {
    res.render('auth');
});

app.get('/userCabinet', (req, res) => {
    res.render('userCabinet');
});

app.get('/users', (req, res) => {
    res.render('users', { users });
});

app.listen(PORT, () => {
    console.log('Listening to 5000');
});
