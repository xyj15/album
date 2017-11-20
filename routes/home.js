var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('home');
});

// router.post('/home', function(req, res) {
//     var response = {
//         "first_name":req.body.name,
//         "last_name":req.body.password
//     };
//     console.log(response);
//     res.end(JSON.stringify(response));
// });

module.exports = router;