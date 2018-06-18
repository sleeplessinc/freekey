// FREEKEY
// FREE KEY STORAGE INTERFACE

const sleepless = require('sleepless'),
	https = require('http');
	https.post = require('https-post');


function FreeKey(key, cb){
   return get(key, res => {
		console.log("RES: ", j2o(res));
		return j2o(res);
	});
}

function get(key, cb){
	// Call URL GET
	let url = "https://sleepless.com/api/v1/freekey/";
	https.post(url, { action: "get", key: key, }, function(r) {
		r.setEncoding('utf8');
		r.on('data', chunk => {
			if(chunk.value !== undefined) {
				chunk.value = j2o(j2o(r.value));
			}
			cb(chunk);
		});
	});	
}

function set(key, val, cb){
	// CALL URL SET
	let url = "https://sleepless.com/api/v1/freekey/";
	https.post(url, { action: "put", key: key, value: o2j(val)}, cb); 
}

function del(key, cb){
	// CALL URL DEL
	let url = "https://sleepless.com/api/v1/freekey/";
	https.post(url, { action: "delete", key: key}, (r) => {
		r.setEncoding('utf8');	
		r.on('data', chunk => {
			if(chunk.value !== undefined) {
				chunk.value = j2o(r.value);
			}
			cb(key, chunk);
		});
	}); 
}

module.exports = {
	init: FreeKey,
	get: get,
	set: set,
	del: del
}

