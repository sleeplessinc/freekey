const express = require('express'),
	sleepless = require('sleepless'),
	fetch = require('node-fetch'),
	fk = require('./freekey');

const app = express();
Sleepless = {
};

Sleepless.db = {
};

Sleepless.db.mysql = {
	connect: function(creds) {
		return function(sql, args, cb) {
			creds.sql = sql;
			creds.args = args;
			let url = "https://sleepless.com/api/v1/db/mysql/";
			fetch(url, { method: 'POST', body: JSON.stringify(creds) })
				.then(res => res.json())
				.then(json => cb(json));
		};
	}	
};

var db = Sleepless.db.mysql.connect({
	user: "kvs",
	pass: "public",
	dbname: "kvs",
});

Sleepless.get = function(key, cb) {
	db("select `value` from `data` where `key`=? limit 1", [key], (r)=>{
		if(r && !r.error) {
			r.value = null;
			if(r.records.length > 0) {
				r.value = j2o(r.records[0].value) || null;
			}
		}
		cb(r);
	});
};

Sleepless.set = function(key, val, cb) {
	val = o2j(val);
	db("insert into data (`key`, `value`) values (?, ?) on duplicate key update `value`=?", [key, val, val], cb);
};

Sleepless.rem = function(key, cb) {
	db("delete from data where `key`=?", [key], cb);
};


Sleepless.get("html_clock_users", (e) => {
	console.log(e);
});
	
app.get('/', (req, res) => {
	res.send("welcome message here in JSON format??");
});

app.get('/a/', (req, res) => {
	let key = req.query.key;
	if(!key) res.send("Please provide a key in the format api_url/key"); return;
	get(key, (r) => {
		if(!r.err){
			console.log(r.err);
			res.send(r.err);
		} else {
			res.send(r.err);
		}
	});
	res.send("not ok");
});


app.listen("12345", () => {
	log("FREEKEY listining on port 12345");
});
