var express = require('express');

/*
//I've left cookie/session code here for when we want users
//SESSION SETUP
var MongoStore = require('connect-mongo')(express)
var ONE_YEAR = 1000 * 60 * 60 * 24 * 365;
*/
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

//collection to store some info on our users
//var $users = db.collection("users");
//collection where we store 
var $gestures = db.collection("gestures");

var app = express()
  .use(express.cookieParser())
  .use(express.bodyParser())
  /*
  .use(express.session({
    secret: settings.SECRET,
    cookie: {maxAge: ONE_YEAR},
    store: new MongoStore(mongoConf)
  }))
  */
  .use('/static', express.static(__dirname + '/static'))
 

app.get("/", index);
function index(req, res, next) {
  res.sendfile(__dirname + '/index.html');
};


///////////////////////////////////////////////////////////////////////////////
// API endpoints
///////////////////////////////////////////////////////////////////////////////

// save a single gesture
app.post("/save/gesture", saveGesture);
function saveGesture(req, res, next) {
  //var user = req.session.user;
  var gesture = req.body.gesture;
  var title = req.body.title;
  var description = req.body.description;

  //we get json object here
  //console.log(data, typeof(data))
  
  var data = {
    //user: user
    title: title || "Gesture",
    description: description || "a smooth movement",
    createdAt: new Date(),
    gesture: gesture
  }
  $gestures.save(data, function(err, result) { if(err) console.error(err); });

  res.send("yay");
};

// list all gestures
app.get("/list/all", allGestures);
function allGestures(req, res, next) {
  $gestures.find({}).toArray(function(err, gestures) {
    var all = gestures.map(function(d) {
      return {
        id: d._id.valueOf(),
        description: d.description
      }
    });
    res.send(all);
  });
};

app.listen(port, function() {
  console.log("prehensile running on port", port);
});



