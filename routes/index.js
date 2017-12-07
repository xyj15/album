var express = require('express');
var router = express.Router();
var db=require('../helper/user');



/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('index');
});
router.post('/', function(req, res, next) {
    var na=req.body.username;
    var pwd=req.body.password;
    var result;
    var success;
    db.getUser(na,function (password) {
        if(password=="error"){
            result="error!";
            success=0;
        }
        else if(password=="null") {
            result = "Unknown name!";
            success=0;
        }
        else if(pwd!=password){
            result = "Wrong password!";
            success=0;
        }
        else{
            result=password;
            success=1;
        }
        res.json({result:result,success:success});
    });

});

module.exports = router;
