var express = require('express');
var router = express.Router();
var venuesController = require('../controllers/venues.js');

/* GET root. */
router.get('/', venuesController.root);

router.get('/test', venuesController.get_test);

/* GET venues listing. */
router.get('/venues', venuesController.get_venues);

/* POST a new venue */
router.post('/venues', venuesController.post_venue);

/* GET a by venue name */
router.get('/venues/:venuename', venuesController.get_venue);

/* DELETE a venue */
router.delete('/venues/:venuename', venuesController.delete_venue);

router.get('/add_database', venuesController.add_database);

router.get('/read_database', venuesController.read_database);

router.get('/drop_collection', venuesController.drop_collection);

router.get('/dropdb', venuesController.drop_db);



module.exports = router;
