// parse-duration: turn "1h 30m" into milliseconds, and back. Zero dependencies.
const UNITS = { ms: 1, s: 1000, m: 60000, h: 3600000, d: 86400000, w: 604800000 };
const ALIASES = {
  ms: 'ms', msec: 'ms', millisecond: 'ms', milliseconds: 'ms',
  s: 's', sec: 's', secs: 's', second: 's', seconds: 's',
  m: 'm', min: 'm', mins: 'm', minute: 'm', minutes: 'm',
  h: 'h', hr: 'h', hrs: 'h', hour: 'h', hours: 'h',
  d: 'd', day: 'd', days: 'd',
  w: 'w', wk: 'w', wks: 'w', week: 'w', weeks: 'w',
};

export function parse(str) {
  if (typeof str === 'number') return str;
  if (typeof str !== 'string') return NaN;
  const s = str.trim().toLowerCase();
  if (s === '') return NaN;
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s); // bare number = ms
  const sign = s.startsWith('-') ? -1 : 1;
  const body = s.replace(/^[-+]/, '');
  const re = /(\d+(?:\.\d+)?|\.\d+)\s*([a-z]+)[\s,]*/g;
  let total = 0, used = 0, match;
  while ((match = re.exec(body)) !== null) {
    if (match.index !== used) return NaN; // junk between parts
    const unit = ALIASES[match[2]];
    if (!unit) return NaN;
    total += parseFloat(match[1]) * UNITS[unit];
    used = re.lastIndex;
  }
  return used === body.length && used > 0 ? sign * total : NaN;
}

export function format(ms) {
  if (typeof ms !== 'number' || !Number.isFinite(ms)) return '';
  if (ms === 0) return '0ms';
  const parts = [];
  let rest = Math.abs(Math.round(ms));
  for (const u of ['w', 'd', 'h', 'm', 's', 'ms']) {
    const n = Math.floor(rest / UNITS[u]);
    if (n) { parts.push(n + u); rest -= n * UNITS[u]; }
  }
  return (ms < 0 ? '-' : '') + parts.join(' ');
}

export default parse;
