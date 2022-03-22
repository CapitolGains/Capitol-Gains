// create express app
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Trade = require('../models/blog');

// register view engine
app.set('view engine', 'ejs');

// connect to mongodb & listen for requests on sucessful connection
const dbURI = "mongodb+srv://cam:GUIGroup8@cluster0.qc8sf.mongodb.net/senate-trades?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// querying for 1 result
Trade.findOne({'owner': 'Self'}, function (err, docs){
        if (err)
            console.log(err)
        else
            console.log(docs);
})


// routing 
app.get('/', (req, res) => {
    //res.send('<p>Homepage</p>');
    res.sendFile('/Users/cambenassi/Documents/Code/UML/3. Junior Year/GUI II/Test Env/views/index.html'); //{ root:__dirname} - second parameter for relative path name
});

app.get('/about', (req, res) => {
    res.sendFile('/Users/cambenassi/Documents/Code/UML/3. Junior Year/GUI II/Test Env/views/about.html')
});

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});



// 404 page
app.use((req, res) => {
    res.status(404).sendFile('/Users/cambenassi/Documents/Code/UML/3. Junior Year/GUI II/Test Env/views/404.html');
});


//cam
//GUIGroup8