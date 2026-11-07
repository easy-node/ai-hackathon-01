import { parse, format } from './index.js';

console.log(parse('1h 30m'));        // 5400000
console.log(parse('2 days, 4 hours')); // 187200000
console.log(parse('1.5s'));          // 1500
console.log(parse('nope'));          // NaN
console.log(format(5400000));        // 1h 30m
console.log(format(parse('90s')));   // 1m 30s
