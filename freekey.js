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

function set(key, val, cb){
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

module.exports = {
	get: get,
	set: set,
	del: del
}

