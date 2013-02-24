var test = [];
var result;
var fs = require('fs');
var filename = '/usr/share/dict/words';
var rl = require('readline').createInterface({
    input: fs.createReadStream(filename),
    terminal: false
}).on('line', function(line){
    test.push(line);
    if (test.length == 1000) {
        rl.close();
    }
}).on('close', function() {
    console.log(test.length);
    result = fuzzy(test, "s");
    console.log(result);
});