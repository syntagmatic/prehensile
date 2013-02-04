prehensile
==========

Gesture data collection and analysis.

## Usage

Install the dependencies
```
npm install
```

run the server
```
node server.js
```

## Database

Have mongodb running.
The default database is prehensile, and gestures are saved into the gestures collection.
You can access the data as such:
mongo  
use prehensile  
db.gestures.find({}).pretty();

