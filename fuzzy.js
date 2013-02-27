var fuzzy = (function () {
    var result = {
        "1": [],    // starts with
        "2": [],    // any after starts with
        "3": [],    // contains
        "4": []     // has some of (fuzzy)
    };

    // input: array of what's to be searched
    // query: what we're searching for... duh
    // caseSensitive: boolean, defaults to false (means we don't care about case)
    var fuzzy = function (input, query, caseSensitive) {
        caseSensitive = typeof caseSensitive !== 'undefined' ? caseSensitive : false;
        var orig = input.slice(0);

        var add = function (str, place, i) {
            result[place].push(str);
            input.splice(i, 1);
            orig.splice(i, 1);
        }

        if (!caseSensitive) {
            query = query.toLowerCase();
            for (var i=0; i<input.length; i++) {
                input[i] = input[i].toLowerCase();
            }
        }

        var fuzz = explode(query.toLowerCase(), false);
        
        for (var i=0; i<input.length; i++) {
            var thing = input[i],
                origthing = orig[i],
                arr = thing.split(' '),
                added = false;


            if (arr[0].indexOf(query) === 0) {
                add(origthing, "1", i);
                added = true;
            } else {
                for (var j=0; j<arr.length; j++) {
                    var elem = arr[j];
                    
                    if (elem.indexOf(query) === 0) {
                        add(origthing, "2", i);
                        added = true;
                        break;
                    }
                }

                if (!added){
                    for (var j=0; j<arr.length; j++) {
                        var elem = arr[j];
                        
                        if (elem.indexOf(query) !== -1) {
                            add(origthing, "3", i);
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
                        add(origthing, "4", i);
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

exports.fuzzy = fuzzy;