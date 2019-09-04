var express = require('express');
var router = express.Router();
var venuesController = require('../controllers/venues.js');

/* GET root. */
router.get('/', venuesController.root);

/* GET venues listing. */
router.get('/venues', venuesController.get_venues);

/* POST a new venue */
router.post('/venues', venuesController.post_venue);

/* GET a by venue name */
router.get('/venues/:venuename', venuesController.get_venue);

/* DELETE a venue */
router.delete('/venues/:venuename', venuesController.delete_venue);

module.exports = router;
