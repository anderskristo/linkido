var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var exphbs     = require('express-handlebars');
var api        = require('./app/api/routes.js');
var routes     = require('./app/routes/routes.js');
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
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Serve
app.use('/', express.static(__dirname + '/public'));

// Register our Routes
app.use('/api', api);
app.use('/', routes);

// Start the server
app.listen(port);
console.log('Magic happends on port: ' + port);
