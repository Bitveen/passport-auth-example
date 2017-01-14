const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


const authenticate = (req, login, password, done) => {
    User.findOne({ login }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            req.flash('error', 'Неверный логин или пароль!');
            return done(null, false);
        }
        user.comparePasswords(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                req.flash('error', 'Неверный логин или пароль!');
                return done(null, false);
            }
            done(null, user);
        });
    });
};


const serializeUser = (user, done) => {
    done(null, user.id);
};

const deserializeUser = (id, done) => {
    User.findById(id, function(err, user) {
        done(err, {
            id: user.id,
            name: user.name,
            age: user.age
        });
    });
};

const localStrategy = new LocalStrategy({
    usernameField: 'login',
    passReqToCallback: true
}, authenticate);






module.exports = {
    localStrategy,
    serializeUser,
    deserializeUser
};
