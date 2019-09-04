let venuesController = require('../controllers/venues.js');
let chai = require('chai');
let expect = chai.expect;

var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);

describe('Venues Controller Unit Tests', function(done) {

	let req = {
		body: {
			country: "Sweden",
			city: "Stockholm",
			venuename: "Bar Pepe",
		},
		params: {
			venuename: "Bar Pepe",
		},
		query: {
			pageSize: "8",
			pageNumber: "9",
	  },
	},
	error = new Error({ error: "blah blah" }),
	res = {},
	expectedResult;


	describe('get_venues', function() {

    const expectedVenues = [{ country : 'Sweden', city : 'Stockholm', venuename : 'Bar Pepe' }];

    beforeEach(function () {
        res = {
            json: sinon.spy(),
            status: sinon.stub().returns({ end: sinon.spy(), json: sinon.spy() }) //json required here to respond with message in addition to 404
        };
    });

		it("calls res.json", test (function () {
      this.spy(venuesController, 'get_venues');
      venuesController.get_venues(req, res);
      sinon.assert.calledOnce(res.json);
		}));

		it("returns an array with all the expectedValues", test (function () {
      this.spy(venuesController, 'get_venues');
      venuesController.get_venues(req, res);
      sinon.assert.calledWith(res.json, expectedVenues);
		}));

	});

	describe('get_venue', function() {

    const expectedVenue = { country : 'Sweden', city : 'Stockholm', venuename : 'Bar Pepe' };

    beforeEach(function () {
        res = {
            json: sinon.spy(),
            status: sinon.stub().returns({ end: sinon.spy(), json: sinon.spy() }) //json required here to respond with message in addition to 404
        };
    });

		it("calls res.json", test (function () {
      this.spy(venuesController, 'get_venue');
      venuesController.get_venue(req, res);
      sinon.assert.calledOnce(res.json);
		}));

		it("returns an object with the expectedValue", test (function () {
      this.spy(venuesController, 'get_venue');
      venuesController.get_venue(req, res);
      sinon.assert.calledWith(res.json, expectedVenue);
		}));

	});

	describe('post_venue', function() {

    beforeEach(function () {
        res = {
            json: sinon.spy(),
            status: sinon.stub().returns({ end: sinon.spy(), json: sinon.spy() })
        };
        expectedResult = req.body;
    });

		it("calls res.json", test (function () {
      this.spy(venuesController, 'post_venue');
      venuesController.post_venue(req, res);
      sinon.assert.calledOnce(res.json);
		}));

		it("returns an object with the expectedResult", test (function () {
      this.spy(venuesController, 'post_venue');
      venuesController.post_venue(req, res);
      sinon.assert.calledWith(res.json, expectedResult);
		}));

	});

	describe('delete_venue', function() {

    const expectedVenue = { country : 'Sweden', city : 'Stockholm', venuename : 'Bar Pepe' };
    const expectedMessage = { message: 'Bar Pepe deleted' };

    beforeEach(function () {
        res = {
            json: sinon.spy(),
            status: sinon.stub().returns({ end: sinon.spy(), json: sinon.spy() }) //json required here to respond with message in addition to 404
        };
    });

		it("calls res.json", test (function () {
      this.spy(venuesController, 'delete_venue');
      venuesController.delete_venue(req, res);
      sinon.assert.calledOnce(res.json);
		}));

		it("returns an object with the expectedMessage ", test (function () {
      this.spy(venuesController, 'delete_venue');
      venuesController.delete_venue(req, res);
      sinon.assert.calledWith(res.json, expectedMessage);
		}));

	});
});