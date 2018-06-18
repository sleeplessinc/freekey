# FreeKey
A free simple way to store JSON in a remote DB.
## Notes
DO NOT USE IN PRODUCTION
This is just for testing your app/site and should not be used ina production setting.
## Example | node test.js
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
