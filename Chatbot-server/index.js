var express = require('express');
var app = express();
var http = require('http');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var server = http.createServer();
var io = require('socket.io'),
    io = io.listen(server);
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect('mongodb://localhost/chat',function(err){
    if(err){
        console.log(err);
    } else{
        console.log('Connected to mongodb');
    }
});

var chatSchema = mongoose.Schema({    
    chatwith: String,
    nick: String,
    msg: String,    
    created: {type: Date, default: Date.now}
});
var Chat = mongoose.model('Message',chatSchema);

var userSchema = mongoose.Schema({
    username: String,
    password: String
});
var User = mongoose.model('User',userSchema);

var regSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    country: String,
    password: String,
    repass: String,
    refferalId: String,
    refferalCode: String
});
var Reg = mongoose.model('Reg',regSchema);

var temp = [];
var users = {};
var formData = [
            'Please enter your email',
            'Please enter your phone no',
            'Please enter your address',
            'Thanks for creating a service. Our executive will connect to you shortly.'
        ];


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});


app.post('/login', function (req, res) {
    console.log('from post');
    var obj1 = {username: req.body.username, password: req.body.password}
    User.create(obj1, function(err, docs){
        if(err){
            res.send(err);
            console.log(err);
        } else{
            res.json(docs);
            console.log(docs);
        }
    });
});

app.post('/signup', function (req, res) {
    console.log('from post');
    var obj = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country,
        password: req.body.password,
        repass: req.body.repass,
        refferalId: req.body.refferalId,
        refferalCode: req.body.refferalCode,
    }
    Reg.create(obj, function(err, docs){
        if(err){
            res.send(err);
            console.log(err);
        } else{
            res.json(docs);
            console.log(docs);
        }
    });
});


io.on('connection', function(socket){
    console.log('User connected');

    socket.on('username', function(username) {
        socket.username = username;
        users[socket.username] = socket;
    });

    socket.on('user detail', function(data){
        var newMsg = new Chat({chatwith: data.username+"_MunshiJi", nick: data.username, msg: data.msg});
        newMsg.save(function(err){
            if(err){
                console.log('err');
            }
        });
        temp.push(data);
            io.emit('user detail', {msg: formData[temp.length -1], username: socket.username, reply_no:'4'});
    });

    socket.on('service page',function(card) {
        io.emit('service page', {msg: 'Please enter your name.', username: socket.username, reply_no:'6'});
    });

    socket.on('end', function (username) {
        socket.disconnect();
        temp = [];
        console.log('User disconnected');
    });

    socket.on('disconnect', function(){
        temp = [];
        console.log('Disconnected');
    });
});


server.listen(port, function(){
    console.log('Server is running on: '+port);
});






