var express = require('express');
var app = express(); 
var path = require ('path');
var bp = require('body-parser');
var session = require('express-session');
var port = 8000;


app.use(express.static(path.join(__dirname, '/client/dist')));
app.use(session({secret: 'keyboard cart'}));
// app.use(session({
//     secret: 'cookie_secret',
//     resave: true,
//     saveUninitialized: true
// }));
app.use(bp.json());

require('./server/config/mongoose.js')
require('./server/config/routes.js')(app);


app.listen(port, function(){
    console.log('Report WORKINGGGGGGGG')
})