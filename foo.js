



freekey = require("freekey");


freekey.get("mystuffkey", (mystuff)=> {		// rest action get

	mystuff.foo = "blah";

	mystuff.put();		// REST action put

});


