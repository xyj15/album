var sqlite3 = require('sqlite3');
var location='/Users/juaner/IdeaProjects/album/database/photo.db';
exports.getPhotos= function (name,album,callback) {
    var db = new sqlite3.Database(location);
    db.all("SELECT id,name,path from photo where user=? and album=? ", [name, album], function (err, row) {
        callback(row);
    });
    db.close();

}
exports.getPhoto= function (id,callback) {
    var db = new sqlite3.Database(location);
    db.all("SELECT path,love from photo where id=? ", [id], function (err, row) {
        callback(row[0]);
    });
    db.close();

};

exports.getLove= function (id,name,callback) {
    var db = new sqlite3.Database(location);
    db.all("SELECT count(*) as count from love where photoId=? and user=?", [id,name], function (err, row) {
        callback(row[0].count);
    });
    db.close();

};
exports.addLove= function (id,name,callback) {
    var db = new sqlite3.Database(location);
    db.run("INSERT INTO love (photoId,user) VALUES (?, ?);",
        [id,name], function(error){
            if (error){
                console.log(error);
                callback(error);
            } else {
                callback("success");
            }
        });
    db.close();

};
exports.delLove=function (id,name,callback) {
    var db=new sqlite3.Database(location);
    db.run("DELETE FROM love WHERE photoId=? and user=? ", [id,name], function(error){
        if (error){
            callback(error);
        } else {
            callback("success");
        }
    });
};
exports.addLoveInPhoto= function (id,callback) {
    var db = new sqlite3.Database(location);
    db.run("UPDATE photo SET love=love+1 WHERE id=?",
        [id], function(error){
            if (error){
                console.log(error);
                callback(error);
            } else {
                callback("success");
            }
        });
    db.close();

};
exports.delLoveInPhoto= function (id,callback) {
    var db = new sqlite3.Database(location);
    db.run("UPDATE photo SET love=love-1 WHERE id=?",
        [id], function(error){
            if (error){
                console.log(error);
                callback(error);
            } else {
                callback("success");
            }
        });
    db.close();

};
exports.addPhoto=function (user,album,path,name,callback) {
    var db=new sqlite3.Database(location);
    db.run("INSERT INTO photo (user,album,path,name) VALUES (?, ?,?,?);",
        [user,album,path,name], function(error){
            if (error){
                console.log(error);
                callback(error);
            } else {
                callback("success");
            }

        });

};
exports.delPhoto=function (id,callback) {
    var db=new sqlite3.Database(location);
    db.run("DELETE FROM photo WHERE id=? ", [id], function(error){
        if (error){
            callback(error);
        } else {
            callback("success");
        }
    });
};

exports.delPhotos=function (album,callback) {
    var db=new sqlite3.Database(location);
    db.run("DELETE FROM photo WHERE album=? ", [album], function(error){
        if (error){
            callback(error);
        } else {
            callback("success");
        }
    });
};
exports.getHotPhoto= function (callback) {
    var db = new sqlite3.Database(location);
    db.all("SELECT photo.*,profile from photo,user  where user=user.name order by love desc", function (err, row) {
        callback(row);
    });
    db.close();

};

exports.getFollowPhoto= function (name,callback) {
    var db = new sqlite3.Database(location);
    db.all("SELECT photo.*,profile from photo,user  where user in(SELECT name\n" +
        " FROM follow where follower= ?) and user.name=user",[name], function (err, row) {
        callback(row);
    });
    db.close();

};