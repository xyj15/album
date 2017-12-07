var sqlite3 = require('sqlite3');

var location='/Users/juaner/IdeaProjects/album/database/photo.db';
exports.getUser= function (name,callback) {
   var db=new sqlite3.Database(location);
    var pwd;
    db.all("SELECT password FROM user WHERE name = ? ",[name],function (err,row){
        console.log(row);
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
}

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
    
}
exports.getProfile=function (name,callback) {
    var path="../photo/"+name+".jpg";
    fs.readFile(path,"binary",function (error,file) {
        if(!error){
            callback(file);
        }
    })
}