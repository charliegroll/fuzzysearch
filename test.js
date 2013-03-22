var test = [],
	result,
	fs = require('fs'),
	fuzzy = require('./fuzzy').Fuzzy,
	fuzz = new fuzzy(),
	fuzz2 = new fuzzy(),
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
		fuzz.clear();
	    fuzz.search(test, "did");
	    console.log('result:');
	    console.log(fuzz.result);
	    console.log('flat result:');
	    console.log(fuzz.flatten(fuzz.result));
	    console.log('indexes:');
	    console.log(fuzz.indexes);
	    console.log('flat indexes:')
	    console.log(fuzz.flatten(fuzz.indexes));
	    console.log();
	    fuzz2.search(['ed','de','edward','Eddy'], "ed");
	    console.log(fuzz2.result);
	    console.log(fuzz2.indexes);
	});