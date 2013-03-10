var test = [],
	result,
	fs = require('fs'),
	fuzzy = require('./fuzzy').Fuzzy,
	filename = '/usr/share/dict/words',
	limit = process.argv[2] || 100,
	rl = require('readline').createInterface({
	    input: fs.createReadStream(filename),
	    terminal: false
	}).on('line', function(line){
	    test.push(line.slice(0,-1));
	    if (test.length == limit) {
	        rl.close();
	    }
	}).on('close', function() {
		fuzzy.clear();
	    fuzzy.search(test, "dide");
	    console.log(fuzzy.result);
	    console.log(fuzzy.flatten(fuzzy.result));
	    console.log(fuzzy.indexes);
	    console.log(fuzzy.flatten(fuzzy.indexes));
	    fuzzy.clear();
	    console.log(fuzzy.result);
	    console.log(fuzzy.indexes);
	});