// FREEKEY
// FREE KEY STORAGE INTERFACE

const sleepless = require('sleepless'),
	request = require('request'),
	https = require('http');
	https.post = require('https-post');

function get(key, cb){
	// Call URL GET
	let url = "https://sleepless.com/api/v1/freekey/";
	request.post({url: url, form: { action: "get", key: key, }}, function(err, res, body) {
		var val = "";
		var error = "";
		if(!err && body) {
			body = j2o(body);
			val = body.value;
			error = body.error;
		} else {
			val = err;
		}
		cb(j2o(val), error, res);
	});	
}

function put(key, val, cb){
	// CALL URL SET
	let url = "https://sleepless.com/api/v1/freekey/";
	request.post({url: url, form: { action: "put", key: key, value: o2j(val)} }, (err) => { cb(err) }); 
}

function del(key, cb){
	// CALL URL DEL
	let url = "https://sleepless.com/api/v1/freekey/";
	request.post({url: url, form: { action: "delete", key: key} }, (err, res, body) => {
		if(body.value !== undefined) {
			body.value = j2o(body).value;
		}
		cb(key, body.value);
	}); 
}



// this just returns the existing api, wrapped so that keys will always be prefixed with a string, so
// I can do:
//      fk = require("fk").prefix("sleepless_");
//      fk.set("foo", "bar", ...)
//      fk.get("foo", ...)
// instead of:
//      fk = require("fk");
//      fk.set("sleepless_foo", "bar", ...)
//      fk.get("sleepless_foo", ...)
function prefix(pre) {
	let o = module.exports;
	return {
		get: function(k, cb) { return o.get(pre+k, cb); },
		put: function(k, v, cb) { return o.put(pre+k, v, cb); },
		del: function(k, cb) { return o.del(pre+k, cb); },
		prefix: function(pre) { return o.prefix(pre); }
	};
}


module.exports = {
	get: get,
	put: put,
	del: del,
	prefix: prefix
}

