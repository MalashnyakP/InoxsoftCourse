const express = require('express');
const expressHbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');
const util = require('util');

const { emailValidator } = require('./helper/emailValidator');
const { PORT } = require('./configs/config');
const users = require('./dataBase/users.json');

const app = express();
const staticPath = path.join(__dirname, 'static');
const dbPath = path.join(__dirname, 'dataBase', 'users.json');

const writeFilePromisify = util.promisify(fs.writeFile);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', staticPath);

app.post('/auth', (req, res) => {
    const { email, password } = req.body;

    if (!emailValidator(email)) {
        res.redirect('/auth?badEmailMsg=Enter valid email.');
        return;
    }

    const user = users.find((userItr) => userItr.email === email);

    if (!user) {
        res.redirect('/signup?userMsg=User not found. Try to sign up.');
        return;
    }

    if (user.password !== password) {
        res.redirect('/auth?badPasswordMsg=Wrong password.');
        return;
    }

    res.redirect(`/userCabinet?id=${user.id}&name=${user.name}&email=${user.email}&password=${user.password}`);
});

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    if (!emailValidator(email)) {
        res.redirect('/signup?badEmailMsg=Enter valid email.');
        return;
    }

    if (password.length < 5) {
        res.redirect('/signup?badPasswordMsg=Enter valid password. Minimun length 5 characters.');
        return;
    }

    const user = users.find((userItr) => userItr.email === email);

    if (!user) {
        users.push({
            id: users.length + 1, name, email, password
        });

        const usersJSON = JSON.stringify(users);
        writeFilePromisify(dbPath, usersJSON);

        res.redirect('auth');
        return;
    }

    res.redirect('/signup?userMsg=User with thie email already exists');
});

app.get('/users/:user_id', (req, res) => {
    let { user_id } = req.params;
    user_id--;

    res.render('userCabinet', {
        id: users[user_id].id, name: users[user_id].name, email: users[user_id].email, password: users[user_id].password
    });
});

app.get('/auth', (req, res) => {
    const { query } = req;

    res.render('auth', { badEmailMsg: query.badEmailMsg, badPasswordMsg: query.badPasswordMsg });
});

app.get('/signup', (req, res) => {
    const { query } = req;

    res.render('signup', { userMsg: query.userMsg, badEmailMsg: query.badEmailMsg, badPasswordMsg: query.badPasswordMsg });
});

app.get('/userCabinet', (req, res) => {
    const { query } = req;

    res.render('userCabinet', {
        id: query.id, name: query.name, email: query.email, password: query.password
    });
});

app.get('/users', (req, res) => {
    res.render('users', { users });
});

app.listen(PORT, () => {
    console.log('Listening to 5000');
});
