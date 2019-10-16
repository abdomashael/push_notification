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
      your_custom_data_key: 'your_custom_data_value'
    },
    notification: {
      title: 'Title of your push notification',
      body: 'Body of your push notification'
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