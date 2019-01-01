function get(key, cb){
    let url = "https://sleepless.com/api/v1/freekey/";
    fetch(url + "?action=get&key="+key)
    .then(res => res.json())
    .then(json => {
        if(!json.error)
            cb(JSON.parse(json.value));
        else
            console.log(json.error)
    });
}

function set(key, value, cb){
    console.log("SET: ", key + " val: ", value);
    let url = "https://sleepless.com/api/v1/freekey/";
    fetch(url + "?action=put&key=" + key + "&value="+ JSON.stringify(value))
    .then(res => res.json())
    .then(json => {
        cb(json);
    });
}