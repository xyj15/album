var express = require('express');
var router = express.Router();
var fs=require('fs');
var db=require('../helper/user');
var multer  = require('multer');
var juedui="/Users/juaner/IdeaProjects/album/public/profile/";
var fileName;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, juedui);
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname);
    }
});
var upload = multer({
    storage: storage
});

router.get('/', function(req, res, next) {

    res.render('imformation');
});

router.post('/pro',upload.single('profile'),function(req,res){
    fileName=req.file.originalname;
    res.json({"success":"1"});
});
router.post('/edit', function(req, res, next) {
    var name=req.body.username;
    var pwd=req.body.password;
    var pwdRepeat=req.body.passwordRepeat;
    var des=req.body.description;
    console.log(des);
    var result;
    var success;
    if(pwd!=pwdRepeat){
        res.json({result:"Passwords does not match!",success:0})
    }
    if(pwd!="") {
        db.editUser(name, pwd,des, function (result) {
            if (result == "success") {
                success = 1;
            }
            else {
                success = 0;
            }
            if(fileName!=""){
                var path="/profile/"+fileName;
                db.editPro(name,path, function (result) {
                    if (result == "success") {
                        success = 1;
                    }
                    else {
                        success = 0;
                    }
                    res.json({success: success});
                });
            }
        });
    }
    else{
        if(fileName!=""){
            var path="/profile/"+fileName;
            db.editPro(name, path, function (result) {
                if (result == "success") {
                    success = 1;
                }
                else {
                    success = 0;
                }
                res.json({success: success});
            });
        }
    }

});
router.post('/profile',function(req,res){
    var name=req.body.username;
    var src;
    var success;
    var des;
    db.getPro(name,function (row) {
            src=row.profile;
            des=row.description;
            success=1;
        res.json({src:src,success:success,des:des});
    });

});
module.exports = router;
