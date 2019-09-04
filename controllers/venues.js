exports.root = function(req, res) {
  res.send('base API route');
};

// Return a list of venues.
exports.get_venues = function(req, res) {
  	var pageSize = req.query.pageSize || 10;
  	var pageNumber = req.query.pageNumber || 10;

  	var resArr = [];
  	var aVenue = { country : 'Sweden', city : 'Stockholm', venuename : 'Bar Pepe' };
  	resArr.push(aVenue);

    res.json(resArr);
};

// Adds a new venue
exports.post_venue = function(req, res) {
		let country = req.body.country || 'nocountry';
    let city = req.body.city || 'nocity';
    let venuename = req.body.venuename || 'novenuename';

    var aVenue = { country : country, city : city, venuename : venuename };

    res.json(aVenue);
};

// Return a venue
exports.get_venue = function(req, res) {
  	var venuename = req.params.venuename;

  	var aVenue = { country : 'Sweden', city : 'Stockholm', venuename : 'Bar Pepe' };

    res.json(aVenue);
};

// Delete a venue
exports.delete_venue = function(req, res) {
  	var venuename = req.params.venuename;

  	res.json({ message: venuename + ' deleted' });
};