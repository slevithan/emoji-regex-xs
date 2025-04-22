const r = String.raw,
  e = r`\p{Emoji}(?:\p{EMod}|[\u{E0020}-\u{E007E}]+\u{E007F}|\uFE0F?\u20E3?)`;
module.exports = () => new RegExp(r`\p{RI}{2}|(?![#*\d](?!\uFE0F?\u20E3))${e}(?:\u200D${e})*`, 'gu');
