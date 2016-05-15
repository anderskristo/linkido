var express = require('express');
var router  = express.Router();
var request = require('request');

router.get('/', function (req, res) {
    request.get({
        url: 'http://localhost:8080/api/links'
    }, function(err, http, body) {
        if (err) {
            return res.status(400).send(err);
        }
        var links = JSON.parse(body);
        links.reverse();
        res.render('home', {
            links: links
        });
    });
});

module.exports = router;
