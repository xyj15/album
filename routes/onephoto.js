var express = require('express');
var router = express.Router();
var fs=require('fs');
var db=require('../helper/photo');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('onephoto');
});
router.post('/onephoto', function(req, res) {

    var name=req.body.username;
    var album=req.body.album;
    var photo=req.body.photo;
    var elePath="/photo/"+name+"/"+album+"/"+photo+".jpg";
    res.json({"path":elePath});
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

module.exports = router;