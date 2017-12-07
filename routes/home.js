var express = require('express');
var router = express.Router();
var photo=require('../helper/photo');

/* GET home page. */
router.get('/', function(req, res) {

    res.render('home');
});

router.post('/photo', function(req, res) {
    photo.getPhoto("/Users/juaner/IdeaProjects/album/photo/3.jpg",function (photo) {
        res.json({photo:photo});
    })
});

module.exports = router;