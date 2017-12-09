var sqlite3 = require('sqlite3');

var location='/Users/juaner/IdeaProjects/album/database/photo.db';
exports.getActivities= function (callback) {
    var db=new sqlite3.Database(location);
    db.all("SELECT * FROM activity",function (err,row){
        callback(row);
    })
    db.close();
}
exports.getJoinedActivities= function (ids,callback) {
    var db=new sqlite3.Database(location);
    for(var i=0;i<ids.length;i++) {
        db.all("SELECT * FROM activity where id=?", [id], function (err, row) {
            console.log(row);
            callback(row);
        });
    }
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
}

