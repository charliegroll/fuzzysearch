var test = [],
	result,
	fs = require('fs'),
	fuzzy = require('./fuzzy').fuzzy,
	filename = '/usr/share/dict/words',
	rl = require('readline').createInterface({
	    input: fs.createReadStream(filename),
	    terminal: false
	}).on('line', function(line){
	    test.push(line.slice(0,-1));
	    if (test.length == 100) {
	        rl.close();
	    }
	}).on('close', function() {
	    console.log(test.length);
	    result = fuzzy(test, "dide");
	    console.log(result);
	});