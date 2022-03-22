const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    
    //routing (changing pages)

    let path = '/Users/cambenassi/Documents/Code/UML/3. Junior Year/GUI II/Test Env/views/';
    switch(req.url) {
        case '/' : 
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301; //perminently moved, redirect
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // set header content type by sending HTML File

    res.setHeader('Content-Type', 'text/html');
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
            res.end();
        }
        else{
            //res.write(data); - res.end() combines both functions
            res.end(data);
        }
        
    });

});

server.listen(3000, 'localhost', () => {
    console.log("Listening for requests on port 3000");
});





 //set header contents manually
    // res.write('<p>Hello world</p>');
    // res.write('<p>This is a test</p>');
    // res.end();