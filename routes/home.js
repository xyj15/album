var express = require('express');
var router = express.Router();
var db=require('../helper/photo');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('home');
});

router.post('/photo', function(req, res) {
    var paths=[];
    var names=[];
    var ids=[];
    var users=[];
    var loves=[];
    var pros=[];
    var username=req.body.username;
    db.getFollowPhoto(username,function (row) {
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