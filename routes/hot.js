var express = require('express');
var router = express.Router();
var db=require('../helper/photo');

router.get('/', function(req, res, next) {
    res.render('hot');
});

router.post('/photo', function(req, res) {
    var paths=[];
    var names=[];
    var ids=[];
    var users=[];
    var loves=[];
    var pros=[];
    db.getHotPhoto(function (row) {
        for(var i=0;i<row.length;i++){
            paths[i]=row[i].path;
            names[i]=row[i].name;
            ids[i]=row[i].id;
            users[i]=row[i].user;
            loves[i]=row[i].love;
            pros[i]=row[i].profile;
        }
        res.json({"paths":paths,"names":names,"ids":ids,"users":users,"loves":loves,"pros":pros});
    })



});

module.exports = router;
