var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var FCM = require('fcm-push');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });


  var serverKey = req.headers.key;
  var fcm = new FCM(serverKey);

  var message = {
    to: req.headers.to, // required fill with device token or topics
    collapse_key: 'your_collapse_key',
    data: {
      title:req.headers.title,
      body: req.headers.body,
      info: req.headers.info
    },
    notification: {
      title: req.headers.title,
      body: req.headers.body
    }
  };

//promise style
  fcm.send(message)
      .then(function(response){
        res.send({ status: "Successfully sent with response: ",
          details:  response});
      })
      .catch(function(err){
        res.send("Something has gone wrong!");
      })
});

module.exports = router;