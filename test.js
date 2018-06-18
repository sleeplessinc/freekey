var fk = require('freekey');

// Quick set variable to value from key
var cars = fk.init('cars');

// Check that the value passed back is what we want
if(!cars) {
	// Initialize the value
	cars = {};
	cars.tesla = "red";
	cars.leaf = "blue";
	cars.bolt = "green";

	// Set the value and reinitialize the cars variable
	fk.set("cars", cars, () => {
		cars = fk.init("cars");	
	});
}

// After being pulled from the DB
log(cars);
