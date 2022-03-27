const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Trade = require('./blog.js');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to mongodb & listen for requests on sucessful connection
const dbURI = "mongodb+srv://cam:GUIGroup8@cluster0.qc8sf.mongodb.net/senate-trades?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(port))
    .catch((err) => console.log(err));

// querying for 1 result
Trade.findOne({'owner': 'Self'}, function (err, docs){
        if (err)
            console.log(err)
        else
            console.log(docs);
})

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

