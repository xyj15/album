var express = require('express');
var router = express.Router();
var fs=require('fs');
var db=require('../helper/photo');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('onephoto');
});
router.post('/onephoto', function(req, res) {

    var id=req.body.id;
    var name=req.body.username;
    var path;
    var love;
    var isloved;
    db.getPhoto(id,function(row){
        path=row.path;
        love=row.love;
        db.getLove(id,name,function(result) {
            isloved=result;
            res.json({"path":path,"love":love,"isloved":isloved});
        })

    })

});
router.post('/delete', function(req, res) {
    var name=req.body.username;
    var album=req.body.album;
    var photo=req.body.photo;
    var id=req.body.id;
    var path="./public/photo/"+name+"/"+album+"/"+photo+".jpg";

    db.delPhoto(id,function (result) {
        fs.unlinkSync(path);
        if(result=="success"){
            res.json({"success":"1"});
        }
    })

});
router.post('/love', function(req, res) {
    var id=req.body.id;
    var name=req.body.username;
    db.addLove(id,name,function (row) {
        if(row=="success"){
            db.addLoveInPhoto(id,function (result) {
                if(result=="success"){
                    res.json({"success":"1"});
                }
            });

        }
    })

});
router.post('/unlove', function(req, res) {
    var id=req.body.id;
    var name=req.body.username;
    db.delLove(id,name,function (row) {
        if(row=="success"){
            db.delLoveInPhoto(id,function (result) {
                if(result=="success"){
                    res.json({"success":"1"});
                }
            });

        }
    })

});
module.exports = router;