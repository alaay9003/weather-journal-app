// Setup empty JS object to act as endpoint for all routes
projectData = {};

const bodyParser = require('body-Parser');
// Require cors 
const cors = require('cors');

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Initialize the main project folder
app.use(express.static('website'));
app.use(cors());
// Setup Server
const port = 8000;

const server = app.listen(port, listening);

function listening(){
    console.log("server running"); 
    console.log(`running on: http://localhost:${port}`);
}
// get all data
app.get('/getAll', ( req ,res)=>{
    res.send(projectData).status(200);
    console.log('from get');
});
// post data 
app.post('/postData', (req, res) => {
    const newData =  req.body;
    projectData = newData;
    res.send(projectData).status(200);
    console.log(projectData);
    console.log('from post');
});
