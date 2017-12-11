var sqlite3 = require('sqlite3');

var location='/Users/juaner/IdeaProjects/album/database/photo.db';
exports.getFollowing= function (name,callback) {
    var db=new sqlite3.Database(location);
    db.all("SELECT * from user where name in( select name FROM follow where follower=?)",[name],function (err,row){
        callback(row);
    })
    db.close();
}

exports.getFollower= function (name,callback) {
    var db=new sqlite3.Database(location);
    db.all("SELECT * from user where name in( select follower FROM follow where name=?)",[name],function (err,row){
        callback(row);
    })
    db.close();
}

exports.isFollowed= function (name,follow,callback) {
    var db=new sqlite3.Database(location);
    db.all("SELECT * from follow where name=? and follower=?",[follow,name],function (err,row){
        callback(row);
    })
    db.close();
}