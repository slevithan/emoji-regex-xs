const r = String.raw,
  seq = r`\p{RI}{2}|\p{Emoji}(?:\p{EMod}|\uFE0F\u20E3?|[\u{E0020}-\u{E007E}]+\u{E007F})?`;
export default () => new RegExp(r`${seq}(?:\u200D(?:${seq}))*`, 'gu');
