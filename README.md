fuzzysearch
===========

A fuzzy-search implementation, inspired by Sublime Text 2's awesome fuzziness, that's written in pure javascript.

```fuzzy(input, query, caseSensitive)```
- ```input``` is an array of possible matches
- ```query``` is the string to search for
- ```caseSensitive``` is a boolean (defaulting to false) that denotes case-sensitivity
- returns a map of 4 arrays
  "1" [starts with the query]
  "2" [if there are spaces in the result, one of the words in it start with the query]
  "3" [contains the query]
  "4" [contains the query... fuzzily] "the cat" fuzzily contains "ah"

- [ ] case-insensitivity
- [ ] optimization (I know this isn't the best implementation, but it's a first shot)
- [ ] possibly remove indexOf to enable IE8 (I really hate IE...)

test.js is a Node.js testing script to use my (Mac OS X) words file with some simple searches.
