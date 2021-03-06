var sqlite3 = require('sqlite3');

var location='/Users/juaner/IdeaProjects/album/database/photo.db';
exports.getUser= function (name,callback) {
   var db=new sqlite3.Database(location);
    var pwd;
    db.all("SELECT password FROM user WHERE name = ? ",[name],function (err,row){
        if(!err) {
            if(typeof(row[0])!='undefined') {
                pwd = row[0].password;
            }
            else {
                pwd = "null";
            }
        }
        else{
            pwd="error"
        }
        callback(pwd);
    })
    db.close();
};

exports.addUser=function (name,password,callback) {
    var db=new sqlite3.Database(location);
    db.run("INSERT INTO user (name,password) VALUES (?, ?);",
        [name,password], function(error){
            if (error){
                console.log(error);
                callback(error);
            } else {
                callback("success");
            }

        });
    
};
exports.editUser=function (name,password,des,callback) {
    var db=new sqlite3.Database(location);
    console.log(des);
    db.run("UPDATE user SET password=?,description=? WHERE name=?", [password,des,name], function(error){
            if (error){
                console.log(error);
                callback(error);
            } else {
                callback("success");
            }
        });
};
exports.editPro=function (name,profile,callback) {
    var db=new sqlite3.Database(location);
    db.run("UPDATE user SET profile=? WHERE name=?", [profile,name], function(error){
        if (error){
            callback(error);
        } else {
            callback("success");
        }
    });
};
exports.getPro= function (name,callback) {
    var db=new sqlite3.Database(location);
    var pro;
    db.all("SELECT profile,description FROM user WHERE name = ? ",[name],function (err,row){
        if(!err) {
            if(typeof(row[0])!='undefined') {
                pro = row[0];
            }
            else {
                pro = "null";
            }
        }
        else{
            pro="error"
        }
        callback(pro);
    })
    db.close();
};
exports.editPwd=function (name,password,callback) {
    var db=new sqlite3.Database(location);
    db.run("UPDATE user SET password=? WHERE name=?", [password,name], function(error){
        if (error){
            console.log(error);
            callback(error);
        } else {
            callback("success");
        }
    });
};
exports.delUser=function (name,callback) {
    var db=new sqlite3.Database(location);
    db.run("DELETE FROM user WHERE name=? ", [name], function(error){
        if (error){
            callback(error);
        } else {
            callback("success");
        }
    });
};
exports.getUsers= function (callback) {
    var db=new sqlite3.Database(location);
    db.all("SELECT * FROM user where name<>'admin' ",function (err,row){
        callback(row);
    })
    db.close();
};