var express = require('express');
var router = express.Router();
var db=require('../helper/activity');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res) {
    res.render('myactivity');
});

router.post('/heldactivity', function(req, res, next) {
    var name="a";
    var time=[];
    var name=[];
    var place=[];
    var id=[];
    db.getHeldActivities("a",function (activity) {
        for(var i=0;i<activity.length;i++){
            name[i]=activity[i].name;
            time[i]=activity[i].time;
            place[i]=activity[i].place;
            id[i]=activity[i].id;
        }
        res.json({name:name,time:time,place:place,id:id});
    });
});
// router.post('/joinedactivity', function(req, res, next) {
//     var name="a";
//     var time=[];
//     var name=[];
//     var place=[];
//     var id=[];
//     var activityId=[];
//     db.getJoinedIds("a",function (activity) {
//         for(var i=0;i<activity.length;i++) {
//             activityId.push(activity[i]);
//
//             db.getHeldActivities(activityId, function (activity) {
//                 name[i] = activity.name;
//                 id[i] = activity.id;
//                 time[i] = activity.time;
//                 place[i] = activity.place;
//             });
//             res.json({name: name, time: time, place: place, id: id});
//         }
//     });
//
// });
router.post('/del', function(req, res, next) {
    var id=req.body.activityId;
    var success;
    db.delActivity(id,function (result) {
        if(result=="success"){
            success=1;
        }
        else {
            success=0;
        }
        res.json({success:success});
    })

});
router.post('/edit', function(req, res) {
    var time=req.body.time;
    var name=req.body.name;
    var place=req.body.place;
    var id=req.body.id;
    console.log(id);
    var success;
    db.editActivity(id,name,time,place,function (result) {
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