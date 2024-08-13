/*
Given the empty object `obj` declared below, add properties to it so
that the console.log statements output the expected values.

Ensure that each property has the correct value type, not just a
value that prints correctly.  For example, the boolean property
should be set to the boolean value `false`, not the string "false".

Use both dot and bracket notation to add properties.
*/

const obj = {};

/******************** DO NOT MODIFY ANY CODE ABOVE THIS LINE *****************/

// Your code here

/******************** DO NOT MODIFY ANY CODE BELOW THIS LINE *****************/

console.log(obj.firstKey);       // firstValue
console.log(obj.numeric);        // 2
console.log(obj["boolean"]);     // false
console.log(obj.object);         // { hello: "world!" }

module.exports = obj;
