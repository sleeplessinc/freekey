// FREEKEY
// FREE KEY STORAGE INTERFACE

const sleepless = require('sleepless');

// RETURNS JSON OBJECT
function get(key){
	// Call URL GET
}

// RETURNS STATUS
function set(key, val){
	// CALL URL SET
}

// RETURNS STATUS
function del(key){
	// CALL URL DEL
}

module.exports = {
	get: get(),
	set: set(),
	del: del()
}
