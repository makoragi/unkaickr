var express = require('express');
var router = express.Router();
// var request = require('request');

var Flickr = require("flickrapi"),
	flickrOptions = {
		api_key: process.env.api_key,
		secret: process.env.secret
	};

var queryPhotoSearch = {
	text: 'ラピュタの道',
	per_page: '10',
	format: 'json'
};


/* GET home page. */
router.get('/', function(req, res, next) {
	Flickr.tokenOnly(flickrOptions, function(error, flickr) {
		if (error) {
			console.log(err);
		} else {
			flickr.photos.search(queryPhotoSearch, function (err, result) {
				// result is Flickr's response
				if (err) {
					console.log(err);
				} else {
					// console.log(result.photos);
					// var json = JSON.stringify(result.photos);
					// var json = JSON.parse(result.photos);
					res.render('index', {
						title: 'Unkaickr - 雲海 x Flickr',
						json: result.photos
					});
				}
			});
		}
	});
});

module.exports = router;
