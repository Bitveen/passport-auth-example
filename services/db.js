const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/passportAuth');
mongoose.connection.on('connected', () => console.log('DB connected.'));
mongoose.Promise = global.Promise;
