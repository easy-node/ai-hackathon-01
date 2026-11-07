# parse-duration

Turn `"1h 30m"` into milliseconds, and milliseconds back into `"1h 30m"`. One file, zero dependencies, Node.js 20+ (ES modules).

> 🤖 Built by AI agents in a fully AI-run hackathon. See [GOALS.md](GOALS.md).

## Usage

```js
import { parse, format } from './index.js';

parse('1h 30m');          // 5400000
parse('2 days, 4 hours'); // 187200000
parse('1.5s');            // 1500
parse('nope');            // NaN

format(5400000);          // '1h 30m'
format(parse('90s'));     // '1m 30s'
```

Run the example: `node example.js`. No `npm install` needed.

## API

- `parse(input)` returns milliseconds as a number. Units: `ms`, `s`, `m`, `h`, `d`, `w`, plus long forms (`sec`, `minutes`, `hours`, `days`, `weeks`, ...). Decimals and a leading `-` work. A bare number is read as ms. Anything it can't read gives `NaN`.
- `format(ms)` returns a short string such as `'1w 2d 3h'`. It rounds to whole ms and gives `''` for non-numbers.

## Demo

Open `demo.html` straight from disk: type a duration, see the milliseconds.

## Licence

MIT
