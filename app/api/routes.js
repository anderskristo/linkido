var Link  = require('../models/link');
var express = require('express');
var router  = express.Router();

// Routes that ends with /links
router.route('/links')

    .get(function(req, res) {
        Link.find({}, function(err, links) {
            if (err) {
                res.send(err);
            }
            res.json(links);
        });
    });

// Routes that ends with /link
router.route('/link')
    // Create link
    .post(function(req, res) {
        var link = new Link(); // New instance of the Link Model
        link.name = req.body.name; // Set the link name
        link.url = req.body.url; // Set the link url

        link.save(function(err) {
            if (err) {
                res.send({
                    response: false,
                    message: err
                });
            }
            res.send({
                response: true,
                data: link,
                message: 'Link added!'
            });
        });
    });

// Routes that ends with /link/:link_id
router.route('/link/:link_id')
    // Get the link
    .get(function(req, res) {
        Link.findById(req.params.link_id, function(err, link) {
            if (err) {
                res.send(err);
            }
            res.json(link);
        });
    })

    // Update link
    .put(function(req, res) {
        Link.findById(req.params.link_id, function(err, link) {
            if (err) {
                res.send(err);
            }
            link.name = req.body.name; // Update link name here
            link.url = req.body.name; // Update link url here

            // Save the new link name
            link.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Link updated!' });
            });
        });
    })

    .delete(function(req, res) {
        Link.remove({
            _id: req.params.link_id
        }, function(err, link) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully delete link' });
        });
    });

// Middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Something is happening');
    next(); // Go to the next route
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to this super API' });
});

module.exports = router;
