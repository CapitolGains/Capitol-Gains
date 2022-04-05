const express = require('express');
const app = express();

const virtualDatabase = require('./data/virtualDatabase.js');
// depreciate
const tempPoliticianData = require('./data/virtualDatabase.js');

// EXPRESS CODE
app.listen(5000, () => console.log('listening at 5000'));
app.use(express.static('public'));

// API CODE
app.use(express.json({ limit: '1mb' }));

// API routing to virtual database
app.post('/api', async (request, response) => {
    // send data request to virtual database
    const data = await virtualDatabase.getData(request.body);
    // return data
    response.json({
        status: 'success',
        message: data,
    });
});

// depreciate
// API routing test response, just used to make sure things are hooked up
app.post('/apiTEST', async (request, response) => {
  console.log('I got a request to test!');
  console.log(request.body);
  // get sample data from tempPoliticianData
  const data = getPoliticians();
  // return data
  response.json({
      status: 'success',
      message: data,
  });
});