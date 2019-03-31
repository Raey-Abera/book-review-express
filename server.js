const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://book:book@cluster0-4b05u.mongodb.net/test?retryWrites=true";
const dbName = "book";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  //console.log(db)
  db.collection('review').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

// app.get('/bookreview',(req,res)=>{
//
// })

app.post('/messages', (req, res) => {
  db.collection('review').save({name: req.body.name, msg: req.body.msg, city: req.body.city, thumbUp: 0, thumbDown:0, heart:0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/messagesUp', (req, res) => {
  db.collection('review')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $set: {
      thumbUp:req.body.thumbUp + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/messages/messagesDown', (req, res) => {//put is triggered by updating
  db.collection('review')

  //loooking for the object with a matching name or message to update
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    //set is what i want to change---- thumbUP and increasing it by one
    $set: {
      thumbDown:req.body.thumbDown + 1//thumbUP triggered the fetch
    }
  }, {
    sort: {_id: -1},//this is top to bottom order
    upsert: true//if it sorts through the entire collection and it doesn't find a doc that matches, it creates it and returns the first one that it finds
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/messages/messagesHeart', (req, res) => {
  db.collection('review')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $set: {
      heart:req.body.heart + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})


app.put('/messages/messagesBook', (req, res) => {
  db.collection('review')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $set: {
      book:req.body.book + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/messages', (req, res) => {
  db.collection('review').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
