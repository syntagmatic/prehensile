prehensile
==========

Gesture data collection and analysis.

## Usage

Requires Node.js and MongoDB.

Install the dependencies
```
npm install
```

run the server
```
node server.js
```

## Viewing

Gesture recorder

  http://0.0.0.0:8080

Gesture gallery (in progress) 

  http://0.0.0.0:8080/gallery

## API

List all gestures

  http://0.0.0.0:8080/list/all

Get a gesture by id

  http://0.0.0.0:8080/gesture/[id]

## Database

Have mongodb running.
The default database is prehensile, and gestures are saved into the gestures collection.
You can access the data as such:
mongo  
use prehensile  
db.gestures.find({}).pretty();

