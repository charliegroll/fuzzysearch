/** @preserve
 * fuzzysearch
 * MIT licensed
 *
 * Copyright (C) 2013 Charlie Groll, http://charliegroll.com
 */
function Fuzzy (){

    this.result = {
        "1": [],    // starts with
        "2": [],    // any after starts with
        "3": [],    // contains
        "4": []     // has some of (fuzzy)
    };

    this.indexes = {
        "1": [],
        "2": [],
        "3": [],
        "4": [] 
    };

    // obj: an object to flatten (returns an array, in order, of the object's elements)
    this.flatten = function (obj) {
        if (typeof obj === 'undefined'){
            return [];
        } else if (typeof obj !== 'object') {
            throw "Flatten takes an object as input!";
        } else if (obj instanceof Array) {
            return obj;
        }

        var res = [],
            k = Object.keys(obj);

        k.forEach(function (el, i) {
            res = res.concat(obj[el]);
        });

        return res;
    }

    // input: array of what's to be searched
    // query: what we're searching for... duh
    // caseSensitive: boolean, defaults to false (means we don't care about case)
    this.search = function (input, query, caseSensitive) {
        caseSensitive = typeof caseSensitive !== 'undefined' ? caseSensitive : false;

        if (!(input instanceof Array)) {
            throw "Fuzzy requires an array input!";
        }

        if (typeof query !== 'string') {
            throw "Fuzzy requires a string query!";
        }

        var orig = input.slice(0),
            o = input.slice(0); // we wanna store the original indexes from input, so we need to keep input intact somewhere

        var add = function (result, indexes, str, place, i) {
            result[place].push(str);
            indexes[place].push(o.indexOf(str));
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
                add(this.result, this.indexes, origthing, "1", i);
                added = true;
            } else {
                for (var j=0; j<arr.length; j++) {
                    var elem = arr[j];
                    
                    if (elem.indexOf(query) === 0) {
                        add(this.result, this.indexes, origthing, "2", i);
                        added = true;
                        break;
                    }
                }

                if (!added){
                    for (var j=0; j<arr.length; j++) {
                        var elem = arr[j];
                        
                        if (elem.indexOf(query) !== -1) {
                            add(this.result, this.indexes, origthing, "3", i);
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
                        add(this.result, this.indexes, origthing, "4", i);
                    }
                }
            }   
            if (added) {
                i--;
            }
        }
        
        return this.result;
    }

    // uses Fuzzy.search() with the additional selector param
    // selector: a basic css selector like 'a.class' for which elements in the list should be searched
    this.searchElems = function (elems, selector, query, caseSensitive) {
        var arr = [];

        elems.forEach(function (el, i) {
            if (isElement(el)) {
                // find string
                el.querySelectorAll(selector).forEach(function (el, i) {
                    // no, really... find string.
                });
                arr.push()
            }
        });

        function isElement(o){
            return (
                typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
                    o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName==="string"
            );
        }
    }

    this.clear = function () {
        this.result = {
            "1": [],    
            "2": [],
            "3": [],
            "4": []
        };

        this.indexes = {
            "1": [],
            "2": [],
            "3": [],
            "4": [] 
        };
    }
};

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

// Taken from charliegroll/ECMA262-5
if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf= function(find, i /*opt*/) {
        if (i===undefined) i= 0;
        if (i<0) i+= this.length;
        if (i<0) i= 0;
        for (var n= this.length; i<n; i++)
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
}

if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach= function(action, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
}

// let's allow Node usage
if (typeof exports !== 'undefined') { 
    exports.Fuzzy = Fuzzy;
}