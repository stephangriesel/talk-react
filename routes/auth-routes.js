const express    = require('express');
const authRoutes = express.Router();

const passport   = require('passport');
const bcrypt     = require('bcryptjs');

const User       = require('../models/user-model');

// CREATE NEW USER & SAVE TO DB
authRoutes.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) { // If username/password not provided send status 400 message
      res.status(400).json({ message: 'Provide username and password' });
      return;
    }

    if(password.length < 4){ // If password length less than 4 send status 400 message
        res.status(400).json({ message: 'Please make your password at least 4 characters long for security purposes.' });
        return;
    }
  
    User.findOne({ username }, (err, foundUser) => {

        if(err){ // If username error send stats 500 message
            res.status(500).json({message: "Username check went bad."});
            return;
        }

        if (foundUser) { // If username selected already exist send status 400 message
            res.status(400).json({ message: 'Username taken. Choose another one.' });
            return;
        }
  
        const salt     = bcrypt.genSaltSync(10); // salt generated for password
        const hashPass = bcrypt.hashSync(password, salt); // hash password with salt
  
        const aNewUser = new User({ // create new user with hashed password
            username:username,
            password: hashPass
        });
  
        aNewUser.save(err => { // save user to db
            if (err) { // if error send status 400 message
                res.status(400).json({ message: 'Saving user to database went wrong.' }); 
                return;
            }
            
            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewUser, (err) => {

                if (err) { // status 500 message if error
                    res.status(500).json({ message: 'Login after signup went bad.' });
                    return;
                }
            
                // Send the user's information to the frontend
                // We can use also: res.status(200).json(req.user);
                res.status(200).json(aNewUser);
            });
        });
    });
});

// USER LOGIN
authRoutes.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => { // keep the authenticate methods in mind: http://www.passportjs.org/docs/authenticate/ as well as the local argument, It refers to local strategy
        if (err) { // if error message 500 send message
            res.status(500).json({ message: 'Something went wrong authenticating user' });
            return;
        }
    
        if (!theUser) { // if user does not exists send 401 message
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.status(401).json(failureDetails);
            return;
        }

        // save user in session
        req.login(theUser, (err) => { // keep the login method in mind: http://www.passportjs.org/docs/login/
            if (err) { 
                res.status(500).json({ message: 'Session save went bad.' });
                return;
            }

            // We are now logged in (that's why we can also send req.user)
            res.status(200).json(theUser);
        });
    })(req, res, next);
});

// LOG OUT
authRoutes.post('/logout', (req, res, next) => {
    // debugger
    // req.logout() is defined by passport
    req.logout();
    res.status(200).json({ message: 'Log out success!' });
});

// LOGGED IN
authRoutes.get('/loggedin', (req, res, next) => {
    // req.isAuthenticated() is defined by passport
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
        return;
    }
    res.status(403).json({ message: 'Unauthorized' });
});

module.exports = authRoutes;