const fk = require('./freekey');

// Set a key, get same key, compare o2j(sent) and received
// Delete previous key, do a get, get nothing back

var obj = {}
	
obj.num = 42;
obj.arr = [1,2,"3"];
obj.sub = {hello: "world"};
obj.str = "let's get freeky";

var tests = {get: false, set: false, del: false}
var fails = 0;
var good = 0;

fk.set("test_object", obj, () => {
	fk.get("test_object", (value, error, res) => {
		// Should be false
		tests.get = !error ? true : false;
		// Should be false
		tests.set = (o2j(value) == o2j(obj)) ? true : false; 
		fk.del("test_object", () => {
			fk.get("test_object", (value, error, res) => {
				// Should be null, after delete
				tests.del = (value == null) ? true : false;
			})
		});
	})
});

for(let i in tests) {
	if(tests[i] == true){
		fails += 1;
	} else {
		good += 1;
	}
}

if(fails > 0) {
	console.log("Failed Tests: " + fails);
	console.log(tests);
} else {
	console.log("Success");
}

