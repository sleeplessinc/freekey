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

	// ------------------------------

	(function() {
		let Crypt = {};

		let ab2str = function(ab) {
			return String.fromCharCode.apply( null, new Uint8Array(ab) );
		};

		let str2ab = function(str) {
			let buf = new ArrayBuffer(str.length);
			let view = new Uint8Array(buf);
			for (var i = 0, len = str.length; i < len; i++) {
				view[i] = str.charCodeAt(i);
			}
			return buf;
		};

		let ab_sha256 = function(s, cb) { crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)) .then(cb); }

		let passKey = function(pw, cb) {
			ab_sha256(pw, hash => {
				crypto.subtle.importKey( "raw", hash, "AES-GCM", true, ["encrypt", "decrypt"] )
				.then(cb)
				.catch(e => {
					console.warn(e.message+"\n"+e.toString());
				});
			})
		}

		Crypt.encrypt = function(plain, password, cb) {
			passKey(password, key => {
				let iv = crypto.getRandomValues(new Uint8Array(12));
				crypto.subtle.encrypt( { name: "AES-GCM", iv: iv }, key, str2ab(encodeURIComponent(plain)) )
				.then( ab => { cb( JSON.stringify([ ab2str(ab), ab2str(iv), ]) ); })
				.catch(e => { cb(null); });
			})
		};

		Crypt.decrypt = function(cipharr, password, cb) {
			cipharr = JSON.parse(cipharr);
			passKey(password, key => {
				crypto.subtle.decrypt( { name: "AES-GCM", iv: str2ab(cipharr[1]) }, key, str2ab(cipharr[0]) )
				.then( res => { cb(decodeURIComponent(ab2str(res))); })
				.catch(e => { cb(null); });
			})
		};

		FreeKey.getCrypt = function(fk_key, enc_key, cb) {
			FreeKey.get( fk_key, rsp => {
				if(rsp.value) {
					Crypt.decrypt( rsp.value, enc_key, json => {
						rsp.value = json; //JSON.parse(json);
						cb(rsp);
					});
				}
				else {
					cb(rsp);
				}
			});
		};

		FreeKey.putCrypt = function(fk_key, val, enc_key, cb){
			Crypt.encrypt( val, enc_key, enc_val => {
				FreeKey.put( fk_key, enc_val, cb );
			});
		};

		FreeKey.getObjCrypt = function(fk_key, enc_key, cb) {
			FreeKey.getCrypt(fk_key, enc_key, rsp => {
				if(rsp.value !== null) {
					rsp.value = JSON.parse(rsp.value);
				}
				cb(rsp); //JSON.parse(rsp.value), rsp);
			});
		};

		FreeKey.putObjCrypt = function(fk_key, obj, enc_key, cb) {
			FreeKey.putCrypt(fk_key, JSON.stringify(obj), enc_key, cb);
		};

	})();

	// ------------------------------

})();

