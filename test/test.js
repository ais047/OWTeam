var should = require("mocha").should;
var express = require("express");
var app = express();
var da = require("../routes/shop-api-routes.js")(app)

describe("api routes", function(){

	it("should get index", function(){
		da.tester();
	});
});