var express = require('express');
var router = express.Router();
var db=require('../helper/user');

router.get('/', function(req, res, next) {
    res.render('register');
});
router.post('/register', function(req, res, next) {
    var na=req.body.username;
    var pwd=req.body.password;
    var pwdRepeat=req.body.passwordRepeat;
    var result;
    var success;
    if(pwd!=pwdRepeat){
        res.json({result:"Passwords does not match!",success:0})
    }
    db.addUser(na,pwd,function (result) {
        if(result=="success"){
            result=na;
            success=1;
        }
        else {
            result = result;
            success=0;
        }
        res.json({result:result,success:success});
    });

});


module.exports = router;
