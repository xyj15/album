var sqlite3 = require('sqlite3');
var location='/Users/juaner/IdeaProjects/album/database/photo.db';
exports.getPhotos= function (name,album,callback) {
    var db = new sqlite3.Database(location);
    db.all("SELECT id,name,path from photo where user=? and album=? ", [name, album], function (err, row) {
        callback(row);
    });
    db.close();

}

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