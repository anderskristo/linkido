var Artist  = require('../models/artist');
var express = require('express');
var router  = express.Router();

// Routes that ends with /artists
router.route('/artists')

    .get(function(req, res) {
        Artist.find({}, function(err, artists) {
            if (err) {
                res.send(err);
            }
            res.json(artists);
        });
    });

// Routes that ends with /artist
router.route('/artist')
    // Create artist
    .post(function(req, res) {
        var artist = new Artist(); // New instance of the Artist Model
        artist.name = req.body.name // Set the artist name

        artist.save(function(err) {
            if (err) {
                res.send(err)
            }
            res.send({ message: 'Artist added!' });
        });
    });

// Routes that ends with /artist/:artist_id
router.route('/artist/:artist_id')
    // Get the artist
    .get(function(req, res) {
        Artist.findById(req.params.artist_id, function(err, artist) {
            if (err) {
                res.send(err);
            }
            res.json(artist);
        });
    })

    // Update artist
    .put(function(req, res) {
        Artist.findById(req.params.artist_id, function(err, artist) {
            if (err) {
                res.send(err);
            }
            artist.name = req.body.name; // Update artist name here

            // Save the new artist name
            artist.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Artist updated!' });
            });
        });
    })

    .delete(function(req, res) {
        Artist.remove({
            _id: req.params.artist_id
        }, function(err, artist) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully delete artist' });
        });
    });


module.exports = router;
