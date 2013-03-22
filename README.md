# fuzzysearch

A fuzzy-search implementation, inspired by Sublime Text 2's awesome fuzziness, that's written in pure javascript. It can be used as a Node.js module or in a browser.

```Fuzzy.search(input, query, caseSensitive)```
- ```input``` is an array of possible matches (strings)
- ```query``` is the string to search for
- ```caseSensitive``` is a boolean (defaulting to false) that denotes case-sensitivity
- returns a map of 4 arrays
  "1" [starts with the query]
  "2" [if there are spaces in the result, one of the words in it start with the query]
  "3" [contains the query]
  "4" [contains the query... fuzzily] "the cat" fuzzily contains "ah"

```Fuzzy.indexes ```
- returns a map (resembling the result of ```Fuzzy.fuzzy()```) that contains the indexes, in order, of the results from ```Fuzzy.fuzzy()```
- requires ```Fuzzy.fuzzy()``` is called first

```Fuzzy.flatten(obj) ```
- ```obj``` is an object or array to flatten
- returns an array of all its elements, in order.

```Fuzzy.clear() ```
- clears Fuzzy.result and Fuzzy.indexes

## Implementation (in Node)

```javascript
var fuzzy = require('./fuzzy').Fuzzy;
var fuzz = new fuzzy();
fuzz.search(array, query); // also returns Fuzzy.result, if you want to store it inline
var result = fuzz.result;
var indexes = fuzz.flatten(fuzz.indexes); // indexes from the original array
fuzz.clear(); // clear it out for next use
```


### To Do:

- [x] case-insensitivity
- [ ] optimization (I know this probably isn't the best implementation, but it's a first shot)
- [x] possibly remove indexOf and forEach to enable IE8 (I really hate IE...)

test.js is a Node.js testing script to use my (Mac OS X) words file with some simple searches.



## License 

MIT licensed

Copyright (C) 2013 Charlie Groll, http://charliegroll.com
