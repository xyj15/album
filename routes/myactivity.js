var express = require('express');
var router = express.Router();
var db=require('../helper/activity');
/* GET home page. */
router.get('/', function(req, res) {
    res.render('myactivity');
});

router.post('/heldactivity', function(req, res, next) {
    var name="a";
    var time=[];
    var name=[];
    var place=[];
    db.getHeldActivities("a",function (activity) {
        for(var i=0;i<activity.length;i++){
            name[i]=activity[i].name;
            time[i]=activity[i].time;
            place[i]=activity[i].place;
        }
        res.json({name:name,time:time,place:place});
    });

});
router.post('/joinedactivity', function(req, res, next) {
    var name="a";
    var time=[];
    var name=[];
    var place=[];
    var activityId=[];
    db.getJoinedIds("a",function (activity) {
        for(var i=0;i<activity.length;i++){
            activityId.push(activity[i]);
        }

            db.getHeldActivities(activityId,function (activity) {
                name[i]=activity.name;
                time[i]=activity.time;
                place[i]=activity.place;
            });


        res.json({name:name,time:time,place:place});
    });



});
module.exports = router;