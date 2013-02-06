var mongoConf = {
  type: 'Mongo',
  host: 'localhost',
  port: 27017,
  db: 'prehensile'
}

var settings = require('./settings');
var port = settings.port || 8888;

//MONGO SETUP
var mongo = require('mongoskin');
var db = mongo.db(mongoConf.host + ':' + mongoConf.port + '/' + mongoConf.db + '?auto_reconnect');

var $gestures = db.collection("gestures");

exports.view = function(req, res) {
  var id = req.params.id;
  $gestures.findById(id, {}, function(err, gesture) {
    res.send(gesture);
  });
};
