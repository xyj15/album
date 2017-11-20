var express = require('express');
var app=express();
var router = express.Router();
var bodyParser = require('body-parser');


// var file='./database/photo.db';
// var sqlite = require('sqlite3');
// var db = new sqlite.Database(file);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});
router.post('/', function(req, res, next) {
    var na=req.body.username;
    var pwd=req.body.password;
    if(na=="a"&&pwd=="a") {
        res.json({"success": 1, "name": "a"});
    }
    else{
        res.json({"success": 0, "name": "a"});
    }
});
router.get('/home', function(req, res) {
    res.render('home');
});
module.exports = router;
