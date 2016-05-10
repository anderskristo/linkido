var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var exphbs     = require('express-handlebars');
var artists    = require('./app/routes/artist.js');
var db         = require('./app/config/db.js');
var port       = process.env.PORT || 8080;

// Configure our app to use bodyParser()
// This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
    next();
});

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

// Serve
app.use('/', express.static(__dirname + '/public'));

// Middleware to use for all requests
artists.use(function(req, res, next) {
    console.log('Something is happening');
    next(); // Go to the next route
});

artists.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to this super API' });
});

// Register our Routes
app.use('/api', artists);

// Start the server
app.listen(port);
console.log('Magic happends on port: ' + port);
