let app = require('../app.js');
let chai = require('chai');
let request = require('supertest')("http://localhost:3000/v1/");
// using this configuration, you have to mock the api
// let request = require('supertest')(app);


let expect = chai.expect;

describe('Venues API Integration Tests', function() {
	describe('#GET /venues', function() {

		it("returns 200 when NO query parameters are provided", function (done) {
			request
			.get('/venues/')
			.expect(200)
			.end(function (err, res) {
				done();
			});

		});

		it("returns 200 when query parameters ARE provided", function (done) {
			request
			.get('/venues?pageSize=7&pageNumber=2')
			.expect(200)
			.end(function (err, res) {
				done();
			});
		});

		it("returns an array", function (done) {
			request
			.get('/venues?pageSize=7&pageNumber=2')
			.expect(200)
			.end(function (err, res) {
				expect(res.body).to.be.an('array');
				done();
			});
		});

	});

	describe('#POST /users', function() {

		it('responds with json', function(done) {
			request
			.post('/venues')
			.send({ country : 'Sweden', city : 'Stockholm', venuename : 'Bar Pepe' })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.expect({ country : 'Sweden', city : 'Stockholm', venuename : 'Bar Pepe' })
			.end(function(err, res) {
				if (err) return done(err);
				done();
			});
		});
	});

	describe('#GET /venues/:venuename', function() {

		it("returns an JSON object with fields -venuename, country, city.", function (done) {
			request
			.get('venues/Bar%20Pepe')
			.expect(200)
			.expect({ country : 'Sweden', city : 'Stockholm', venuename : 'Bar Pepe' })
			.end(function (err, res) {
				// you can use Chai here!!!
				expect(res.body).to.be.an('object');
				expect(res.body).to.have.property('venuename');
				expect(res.body).to.have.property('country');
				expect(res.body).to.have.property('city');
				done();
			});
		});

	});

	describe('#DELETE /venues/:venuename', function() {
		it('responds with json', function(done) {
			request
			.delete('/venues/Bar%20Pepe')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200).
			expect({ message: 'Bar Pepe deleted'})
			.end(function(err, res) {
				if (err) return done(err);
				console.log(res.body);
				done();
			});
		});

	});

});