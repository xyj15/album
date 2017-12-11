var express = require('express');
var router = express.Router();
var db=require('../helper/friend');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('friend');
});
router.post('/following', function(req, res, next) {
    var name=req.body.username;
    var names=[];
    var pros=[];

    db.getFollowing(name,function (friend) {
        for(var i=0;i<friend.length;i++){
            names[i]=friend[i].name;
            pros[i]=friend[i].profile;
        }
        res.json({names:names,pros:pros});
    })

});
router.post('/follower', function(req, res, next) {
    var name=req.body.username;
    var names=[];
    var pros=[];

    db.getFollower(name,function (friend) {
        for(var i=0;i<friend.length;i++){
            names[i]=friend[i].name;
            pros[i]=friend[i].profile;
        }
        res.json({names:names,pros:pros});
    })

});
module.exports = router;