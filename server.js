const express = require('express');

const bodyParser = require('body-parser');

const app = express();

// parse request of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// route
app.get('/', (req, res) => {
    res.json({ message: 'Hello Jesus' });
});

// setting up the port for the application to run on
app.listen(3000, () =>{
    console.log('Server is running on port 3000.');
})