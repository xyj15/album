var sqlite3 = require('sqlite3');

var location='/Users/juaner/IdeaProjects/album/database/photo.db';
exports.getActivities= function (callback) {
    var db=new sqlite3.Database(location);
    db.all("SELECT * FROM activity",function (err,row){
        console.log(row);
        callback(row);
    })
    db.close();
}
exports.getJoinedActivities= function (name,callback) {
    var db=new sqlite3.Database(location);
        db.all("SELECT * FROM activity where id in(select activityId from joinActivity where name = ? )", [name], function (err, row) {
            console.log(row);
            callback(row);
        });
    db.close();
}
exports.getHeldActivities= function (name,callback) {
    var db=new sqlite3.Database(location);
    db.all("SELECT * FROM activity where initiator=?",[name],function (err,row){
        callback(row);
    })
    db.close();
}
exports.getJoinedIds= function (name,callback) {
    var db=new sqlite3.Database(location);
    var id=[];
    db.all("SELECT activityId FROM joinActivity where name=?",[name],function (err,row){
        for(var i=0;i<row.length;i++){
            id.push(row[i].activityId);
        }
        callback(id);
    })
    db.close();
};
exports.addActivity=function (name,initiator,time,place,callback) {
    var db=new sqlite3.Database(location);
    db.run("INSERT INTO activity (name,initiator,time,place) VALUES (?,?,?,?);",
        [name,initiator,time,place], function(error){
            if (error){
                console.log(error);
                callback(error);
            } else {
                callback("success");
            }

        });
};

exports.joinActivity=function (name,activityId,callback) {
    var db=new sqlite3.Database(location);
    db.run("INSERT INTO joinActivity (name,activityId) VALUES (?,?);",
        [name,activityId], function(error){
            if (error){
                console.log(error);
                callback(error);
            } else {
                callback("success");
            }
        });
};
exports.delActivity=function (id,callback) {
    var db=new sqlite3.Database(location);
    console.log(id);
    db.run("DELETE FROM activity WHERE id=? ", [id], function(error){
            if (error){
                console.log(error);
                callback(error);
            } else {
                callback("success");
            }
        });
};
exports.editActivity=function (id,name,time,place,callback) {
    var db=new sqlite3.Database(location);
    console.log(time);
    db.run("UPDATE activity SET name=?,time=?,place=? WHERE id=?", [name,time,place,id], function(error){
            if (error){
                console.log(error);
                callback(error);
            } else {
                callback("success");
            }

        });
};
exports.delJoinedActivity=function (id,name,callback) {
    var db=new sqlite3.Database(location);
    db.run("DELETE FROM joinActivity WHERE activityId=? and name=? ", [id,name], function(error){
        if (error){
            callback(error);
        } else {
            callback("success");
        }
    });
};