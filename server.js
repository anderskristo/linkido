var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// Configure our app to use bodyParser()
// This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// Add database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mymusic');

// Add Artist Schema
var Artist = require('./app/models/artist');

// Routes for our API
var router = express.Router();

// Middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Something is happening');
    next(); // Go to the next route
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to this super API' });
});

// Routes that ends with /artist
router.route('/artist')
    .post(function(req, res) {
        var artist = new Artist(); // New instance of the Artist Model
        artist.name = req.body.name // Set the artist name

        artist.save(function(err) {
            if (err) {
                res.send(err)
            }
            res.send({ message: 'Artist added!' });
        })
    });

// Register our Routes
// all routes will be prefixed with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Magic happends on port: ' + port);
