// create express app
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Trade = require('../models/blog');
const os = require('os');

// register view engine
app.set('view engine', 'ejs');

// setting dynamic port number for heroku & 3000 for localhost
//var port_number = server.listen(process.env.PORT || 3000);
let port = process.env.PORT || 3000;

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

// getting working dir
let dir = __dirname;
dir = dir.slice(0, -10); // slice off /assets/js/app.js to get working directory up to "/CapitolGains"

// routing 
app.get('/', (req, res) => {
    //res.send('<p>Homepage</p>');
    console.log(dir);
    res.sendFile(dir + '/views/index.html'); //{ root:__dirname} - second parameter for relative path name
});

app.get('/about', (req, res) => {
    res.sendFile(dir + '/views/about.html')
});

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});



// 404 page
app.use((req, res) => {
    res.status(404).sendFile(dir + '/views/404.html');
});


//cam
//GUIGroup8