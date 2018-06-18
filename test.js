const fk = require('./freekey');

// Set a key, get same key, compare o2j(sent) and received
// Delete previous key, do a get, get nothing back

var obj = {}
	
obj.num = 42;
obj.arr = [1,2,"3"];
obj.sub = {hello: "world"};
obj.str = "let's get freeky";

fk.set("test_object", obj, () => {
	fk.get("test_object", (value, res) => {
		// Should be true
		console.log("ARE OBJECTS SAME? ", value == o2j(obj));
		fk.del("test_object", () => {
			fk.get("test_object", (value, res) => {
				// Should be null, after delete
				console.log("DOES OBJECT HOLD VALUE? ", value);
			})
		});
	})
});
