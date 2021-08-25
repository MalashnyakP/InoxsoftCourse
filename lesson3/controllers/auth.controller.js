const fs = require('fs');
const path = require('path');
const util = require('util');

const users = require('../dataBase/users.json');
const { emailValidator } = require('../helper/emailValidator');

const dbPath = path.join(__dirname, 'dataBase', 'users.json');
const writeFilePromisify = util.promisify(fs.writeFile);

module.exports = {
    signUp:  (req, res) => {
        const { name, email, password } = req.body;
        
        if(!emailValidator(email)){
            res.redirect('/signup?badEmailMsg=Enter valid email.');        
            return;
        }
    
        if(password.length < 5){
            res.redirect('/signup?badPasswordMsg=Enter valid password. Minimun length 5 characters.'); 
            return;
        }
     
        const user = users.find(user => user.email === email);
    
        if(!user){
            users.push({id: users.length + 1, name, email, password});
           
            const usersJSON = JSON.stringify(users);         
            writeFilePromisify(dbPath, usersJSON);
            
            res.redirect('auth');      
            return;
        }
    
        res.redirect('/signup?userMsg=User with thie email already exists');
    },

    signIn: (req, res) => {
        const { email, password } = req.body;
    
        if(!emailValidator(email)){
            res.redirect('/auth?badEmailMsg=Enter valid email.');
            return;
        }
    
        const user = users.find(user => user.email === email);
        
        if (!user) {
            res.redirect('/signup?userMsg=User not found. Try to sign up.');
            return;
        }
    
        if(user.password !== password){
            res.redirect('/auth?badPasswordMsg=Wrong password.');
            return;
        }
    
        res.render('userCabinet',
         { id: user.id, 
           name: user.name,
           email: user.email, 
           password: user.password });                       
    },

    renderSignUpPage: (req, res) => {
        const query = req.query;
    
        res.render('signup',{userMsg: query.userMsg, badEmailMsg: query.badEmailMsg, badPasswordMsg: query.badPasswordMsg});
    },

    renderSignInPage: (req, res) => {
        const query = req.query;
       
        res.render('auth', {badEmailMsg: query.badEmailMsg, badPasswordMsg: query.badPasswordMsg});
    }
}