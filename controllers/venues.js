const Venue = require('../models/venues');
const mongoose = require('mongoose');


exports.root = function(req, res) {
  res.send('base API route');
};

exports.get_test = function(req, res) {
 // var pageSize = req.query.pageSize || 10;
 // var pageNumber = req.query.pageNumber || 10;

  const resAPI = {
    id: '765',
    country:'Spain',
    city: 'Lugo',
    name: 'Bar Manolo',
    desc: 'Incredible atmosphere and delicious food',
    img: '/images/bar1.jpg',
    music: {
      artists: ['Michael Jackson', 'Queen', 'The XX', 'Pavement'],
      tracks: [
        { trackid: '1', artist: 'Michael Jackson', title:  'Thriller' },
        { trackid: '2', artist: 'Queen', title:  'Under pressure' },
      ],
      queue: [ { trackid: '1', artist: 'Michael Jackson', title:  'Thriller' },
               { trackid: '7', artist: 'Pavement', title:  'Cut your hair' }
      ]
    }
  };

  res.json(resAPI);
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
  let venuename = req.body.venuename || 'novenuename';
  let firstname = req.body.firstname || 'firstname';
  let lastname = req.body.lastname || 'lastname';
  let email = req.body.email || 'noemail';
  let password = req.body.password || 'nopassword';
  let country = req.body.country || 'noº';
  let city = req.body.city || 'nocity';


  var aVenue = {
    venuename : venuename,
    firstname : firstname,
    lastname : lastname,
    email : email,
    password : password,
    country : password,
    city : password
  };

  console.log('sdfsdfsfsfdsfsdfssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss');
  // var newVenue = new Venue(aVenue);
  // newVenue.save(function (err) {
  //   if(err) {
  //     res.status(400).send('Unable to save venue to database');
  //   } else {
  //     console.log(aVenue);
  //     console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhsssssssssssssssssssssssssssssssssssssssssss');
  //     // res.json(aVenue);
  //     res.send('ok');
  //   }
  // });
  aVenue = { v: 1 };
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

exports.add_database = function(req, res){

  let date_now = Date.now();
  var newVenue = new Venue({kosmik_date: date_now});

  newVenue.save(function (err) {
    if(err) {
      res.status(400).send('Unable to save venue to database');
    } else {
      res.json({ message: date_now + ' saved in DB' });
    }
  });
};

exports.read_database = function(req, res){

  var myQuery = Venue.find({});
  myQuery.sort({kosmik_date: 1});
  myQuery.select('kosmik_date');
  myQuery.exec(function (err, venues){
    if (!err){
      res.json({ message: ' Reading from DB', venues: venues });
    }else{
      res.status(400).send('Error reading db');
    }
  });

};

exports.drop_collection = function(req, res){

  // https://stackoverflow.com/questions/11453617/mongoose-js-remove-collection-or-db
  Venue.collection.drop(function(err, result) {
    if (err){
      res.status(400).send(err);
    }else{
      res.json({ message: ' Dropped collection', result: result });
    }
  });
  // or the old way - if not sharkinfo.venues try just venues
  // mongoose.connection.db.dropCollection('sharkinfo.venues', function(err, result) {
  //   if (err){
  //     res.status(400).send(err);
  //   }else{
  //     res.json({ message: ' Dropped collection', result: result });
  //   }
  // });

};

exports.drop_db = function(req, res){

  mongoose.connection.db.dropDatabase(function(err, result) {
    if (err){
      res.status(400).send(err);
    }else{
      res.json({ message: ' Dropped db', result: result });
    }
  });

};

// exports.drop_db = function(req, res){
  //  EXAMPLE _ USING PROMISES
  // const todo = new Todo({
  // text: req.body.text,
  // completedAt: Date.now()
  // });
  // todo
  // .save()
  // .then(todos => res.redirect('/'))
  // .catch(err => res.status.send(err));
// };