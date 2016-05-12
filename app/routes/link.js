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
        link.name = req.body.name // Set the link name

        link.save(function(err) {
            if (err) {
                res.send(err)
            }
            res.send({ message: 'Link added!' });
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


module.exports = router;
