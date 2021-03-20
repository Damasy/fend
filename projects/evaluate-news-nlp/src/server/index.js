var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

// configs
dotenv.config();

const API_KEY = process.env.API_KEY;

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

//bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
const port = process.env.PORT || `8081`;
app.listen(port, function () {
    console.log(`Server listening on port ${port}!`)
});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
});

app.post('/api', getData);

async function getData(req, res) {

    const urlToCheck = req.body.formText;

    const url = `https://api.meaningcloud.com/sentiment-2.1?key=${API_KEY}&url=${urlToCheck}&lang=auto`;

    const checkResult = await fetch(url);

    try {
        const apiResult = await checkResult.json();

        console.log(apiResult);
        res.send(apiResult);
    }
    catch (error) {
        console.log('ERROR: Could not get data in getData().  Message: ' + error);
        alert(`ERROR: Could not get data. Please try again.`);
    }
}