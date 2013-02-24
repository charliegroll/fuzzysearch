var fuzzy = (function () {
    var result = {
        "1": [],    // starts with
        "2": [],    // any after starts with
        "3": [],    // contains
        "4": []     // has some of (fuzzy)
    };

    // input: array of what's to be searched
    // query: what we're searching for... duh
    var fuzzy = function (input, query, caseSensitive) {
        caseSensitive = typeof caseSensitive !== 'undefined' ? caseSensitive : false;

        if (!caseSensitive) {
            // we need lower case input
        }

        var fuzz = explode(query.toLowerCase(), false);
        
        for (var i=0; i<input.length; i++) {
            var thing = input[i],
                arr = thing.split(' '),
                added = false;


            if (arr[0].indexOf(query) === 0) {
                result["1"].push(thing);
                input.splice(i, 1);
                added = true;
            } else {
                for (var j=0; j<arr.length; j++) {
                    var elem = arr[j];
                    
                    if (elem.indexOf(query) === 0) {
                        result["2"].push(thing);
                        input.splice(i, 1);
                        added = true;
                        break;
                    }
                }

                if (!added){
                    for (var j=0; j<arr.length; j++) {
                        var elem = arr[j];
                        
                        if (elem.indexOf(query) !== -1) {
                            result["3"].push(thing);
                            input.splice(i, 1);
                            added = true;
                            break;
                        }
                    }
                }
                
                if (!added){
                    var everything = explode(thing);
                    added = true;
                    for (var j=0; j<fuzz.length; j++) {
                        if (everything.indexOf(fuzz[j]) === -1) {
                            added = false;
                            break;
                        }
                    }

                    if (added) {
                        result["4"].push(thing);
                        input.splice(i, 1);
                    }
                }
            }   
            if (added) {
                i--;
            }
        }
        
        return result;
    }

    var explode = function (string, duplicates) {
        var result = [];
        duplicates = typeof duplicates !== 'undefined' ? duplicates : true;

        for (var i=0; i<string.length; i++) {
            if (string[i] != ' ') {
                result.push(string[i]);
            }
        }
        return result;
    }

    return fuzzy;
})();