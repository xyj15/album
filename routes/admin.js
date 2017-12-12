var express = require('express');
var router = express.Router();
var db=require('../helper/user');



/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('admin');
});

router.post('/users', function(req, res, next) {
    var names=[];
    db.getUsers(function (row) {
        for(var i=0;i<row.length;i++){
            names[i]=row[i].name;
        }

        res.json({"success":"1",names:names});

    })
});
router.post('/del', function(req, res, next) {
    var name=req.body.username;

    db.delUser(name,function () {
        res.json({"success":"1"});
    })

});
router.post('/edit', function(req, res, next) {
    var name=req.body.username;
    var pwd=req.body.password;
    console.log(pwd);
    if(pwd==null||pwd==""){
        res.json({"success":"0"});
    }
    else{
        db.editPwd(name,pwd,function (row) {
            res.json({"success":"1"});
        })

    }

});
module.exports = router;
