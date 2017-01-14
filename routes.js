const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('./models/user');
const authRequired = require('./middlewares/auth');

router.get('/', authRequired, (req, res) => {
    console.log(req.user);
    res.render('index', { user: req.user });
});

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('back');
    }
    res.render('login');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
});

router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('back');
    }
    res.render('register');
});

router.post('/register', (req, res, next) => {
    let {login, password, name, age} = req.body;

    User.findOne({login: login}, (err, existingUser) => {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            req.flash('error', 'Пользователь с таким логином уже существует!');
            return res.redirect('/register');
        }
        let user = new User({login, password, name, age});

        user.save((err) => {
            if (err) {
                return res.redirect('/register');
            }
            passport.authenticate('local', (err, user, info) => {
                return res.redirect('/');
            })(req, res, next);
        });

    });

});


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});


module.exports = router;
