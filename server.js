const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const router = require('./routes');
const app = express();

const passportService = require('./services/passport');
require('./services/db');

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(passportService.localStrategy);
passport.serializeUser(passportService.serializeUser);
passport.deserializeUser(passportService.deserializeUser);



app.use(router);

app.listen(app.get('port'), () => console.log('Listening...'));
