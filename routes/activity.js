var express = require('express');
var router = express.Router();
var db=require('../helper/activity');
/* GET home page. */
router.get('/', function(req, res) {
    res.render('activity');
});

router.post('/activity', function(req, res, next) {
    var time=[];
    var name=[];
    var place=[];
    var id=[];
    db.getActivities(function (activity) {
        for(var i=0;i<activity.length;i++){
            name[i]=activity[i].name;
            time[i]=activity[i].time;
            place[i]=activity[i].place;
            id[i]=activity[i].id;
        }
        res.json({name:name,time:time,place:place,id:id});
    });

});
router.post('/add', function(req, res, next) {
    var time=req.body.time;
    var name=req.body.name;
    var place=req.body.place;
    var initiator=req.body.initiator;
    var success;
    db.addActivity(name,initiator,time,place,function (result) {
        if(result=="success"){
            success=1;
        }
        else {
            success=0;
        }
        res.json({success:success});
    })

});
router.post('/join', function(req, res, next) {
    var name=req.body.name;
    var activityId=req.body.activityId;
    var success;
    db.joinActivity(name,activityId,function (result) {
        if(result=="success"){
            success=1;
        }
        else {
            success=0;
        }
        res.json({success:success});
    })

});
module.exports = router;