const r = String.raw,
  seq = r`(?:\p{RI}{2}|\p{Emoji}(?:\p{EMod}|[\u{E0020}-\u{E007E}]+\u{E007F}|\uFE0F?\u20E3?))`;
export default () => new RegExp(r`(?![#*\d](?!\uFE0F?\u20E3))${seq}(?:\u200D${seq})*`, 'gu');
