// Copyright 2018 Sleepless Inc. All Rights Reserved

(function() {

	FreeKey = {};

	let RESTPATH = "https://sleepless.com/api/v1/freekey/";

	let uenc = function(s) { return encodeURIComponent(s); };

	let fkfetch = function(a, k, v, cb) {
		var u = RESTPATH + "?action=" + uenc(a) + "&key=" + uenc(k || "") + "&value="+ uenc(v || "");
		fetch( u )
		.then( res => {
			return res.json();
		})
		.then( obj => {
			cb( obj );
		})
	}

	FreeKey.get = function(key, cb) {
		fkfetch("get", key, null, cb);
	};

	FreeKey.put = function(key, val, cb){
		fkfetch("put", key, val, cb);
	}

	FreeKey.del = function(key, cb) {
		fkfetch("del", key, null, cb);
	};

	FreeKey.getObj = function(key, cb) {
		FreeKey.get(key, function(obj) {
			cb(JSON.parse(obj.value), obj);
		});
	};

	FreeKey.putObj = function(key, obj, cb) {
		FreeKey.put(key, JSON.stringify(obj), function(obj) {
			cb(obj);
		});
	};

})();

