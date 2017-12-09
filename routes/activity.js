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
    db.getActivities(function (activity) {
        for(var i=0;i<activity.length;i++){
            name[i]=activity[i].name;
            time[i]=activity[i].time;
            place[i]=activity[i].place;
        }
        res.json({name:name,time:time,place:place});
    });

});
module.exports = router;