# FreeKey
A free simple way to store JSON in a remote DB.
## Notes
DO NOT USE IN PRODUCTION
This is just for testing your app/site and should not be used ina production setting.
## FREEKEY IN TEN LINES
	const fk = require('freekey');

	// Get a key
	// Callback contains optional res object which is the full httpResponse from the server
	fk.get('carsthatilike', (value) => { log(value) };

	// Set a key
	fk.put("hello", "world", () => { console.log("ALL DONE") );

	// Delete a key
	// Simply returns the deleted key name that was passed in
	fk.del("hello", (key) => { console.log(key) };
