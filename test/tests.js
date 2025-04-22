// Only test the latest Unicode version's full emoji lists in recent Node.js since emoji-regex-xs
// uses the version of Unicode supported by the environment
const isLatestNode = +process.versions.node.split('.')[0] >= 23;

// Tests copied (with modifications) from emoji-regex 10.4.0 by @mathiasbynens; MIT License
// <https://github.com/mathiasbynens/emoji-regex>

const assert = require('assert');

const regex = require('../index.js');

const unicodeDataPackage = require('./unicode-data-package.js');
const RGI_EMOJI_SEQUENCES = require('./get-sequences.js');

describe('regex', () => {

  // Start off with some hardcoded tests just to be safe. These are repeated by
  // the scripted loop below.
  it('matches expected code points', function() {

    // U+1F198 SQUARED SOS
    assert(regex().test('\u{1F198}'));

    // U+1F1FE REGIONAL INDICATOR SYMBOL LETTER Y
    // U+1F1EA REGIONAL INDICATOR SYMBOL LETTER E
    // → flag for Yemen
    assert(regex().test('\u{1F1FE}\u{1F1EA}'));
    assert.deepStrictEqual(
      '\u{1F1FE}\u{1F1EA}'.match(regex())[0],
      '\u{1F1FE}\u{1F1EA}'
    );

    // U+1F1FA REGIONAL INDICATOR SYMBOL LETTER U
    // U+1F1F8 REGIONAL INDICATOR SYMBOL LETTER S
    // → flag for United States
    assert(regex().test('\u{1F1FA}\u{1F1F8}'));
    assert.deepStrictEqual(
      '\u{1F1FA}\u{1F1F8}'.match(regex())[0],
      '\u{1F1FA}\u{1F1F8}'
    );

    // U+1F469 WOMAN
    // U+1F3FE EMOJI MODIFIER FITZPATRICK TYPE-5
    // U+200D ZERO WIDTH JOINER
    // U+2708 AIRPLANE
    // U+FE0F VARIATION SELECTOR-16
    // → woman pilot: medium-dark skin tone
    assert(regex().test('\u{1F469}\u{1F3FE}\u200D\u2708\uFE0F'));
    assert.deepStrictEqual(
      '\u{1F469}\u{1F3FE}\u200D\u2708\uFE0F'.match(regex())[0],
      '\u{1F469}\u{1F3FE}\u200D\u2708\uFE0F'
    );

  });

  const test = (string) => {
    it(`matches ${ string } as a single unit`, () => {
      assert(regex().test(string));
      assert.deepStrictEqual(string.match(regex())[0], string);
    });
  };

  if (isLatestNode) {
    // Test `Emoji_Modifier_Base` symbols.
    const Emoji_Modifier_Base = require(`${unicodeDataPackage}/Binary_Property/Emoji_Modifier_Base/symbols.js`);
    for (const symbol of Emoji_Modifier_Base) {
      test(symbol);
    }
  }

  // Test an `Emoji_Modifier_Base` followed by an `Emoji_Modifier`.
  test('\u{1F469}\u{1F3FF}');

  // Test an `Emoji_Modifier_Base` not followed by an `Emoji_Modifier`.
  test('\u{1F469}');

  // Test a default text presentation character rendered as emoji.
  test('\u{2194}\uFE0F');
  test('\u{1F321}\uFE0F');
  test('\u261D\uFE0F');

  // Test an emoji that was added in v4 of emoji-data.txt.
  test('\u{1F923}'); // U+1F923 ROLLING ON THE FLOOR LAUGHING

  // Test a regular emoji sequence (`emoji-sequences.txt`).
  test('1\uFE0F\u20E3');
  test('\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}');

  // Test a ZWJ emoji sequence (`emoji-zwj-sequences.txt`).
  test('\u{1F3CA}\u{1F3FD}\u200D\u2640\uFE0F');

  // Test an Emoji 13.1 sequence.
  test('\u{1F48F}\u{1F3FF}');

  if (isLatestNode) {
    // Test all RGI_Emoji sequences.
    for (const sequence of RGI_EMOJI_SEQUENCES) {
      test(sequence);
    }
  }

  if (isLatestNode) {
    // Test all emoji-test.txt sequences from <https://unicode.org/Public/emoji/latest/emoji-test.txt>
    const EMOJI_TEST_SEQUENCES = require(`${unicodeDataPackage}/Sequence_Property/Emoji_Test/index.js`);
    for (const sequence of EMOJI_TEST_SEQUENCES) {
      test(sequence);
    }

    // From <https://github.com/mathiasbynens/emoji-test-regex-pattern/blob/main/script/get-sequences.js>
    const EXTRA_SEQUENCES = [
      // The following handshake emoji sequences were officially added in
      // Emoji 14.0.
      '\u{1F91D}\u{1F3FB}', // handshake: light skin
      '\u{1F91D}\u{1F3FC}', // handshake: medium-light skin
      '\u{1F91D}\u{1F3FD}', // handshake: medium skin
      '\u{1F91D}\u{1F3FE}', // handshake: medium-dark skin
      '\u{1F91D}\u{1F3FF}', // handshake: dark skin

      '\u{1F93C}\u{1F3FB}', // wrestlers: light skin
      '\u{1F93C}\u{1F3FC}', // wrestlers: medium-light skin
      '\u{1F93C}\u{1F3FD}', // wrestlers: medium skin
      '\u{1F93C}\u{1F3FE}', // wrestlers: medium-dark skin
      '\u{1F93C}\u{1F3FF}', // wrestlers: dark skin

      // Overqualified emoji sequences as entered via the iOS emoji picker.
      '\u231A\uFE0F', // watch
      '\u231B\uFE0F', // hourglass
      '\u25FE\uFE0F', // black medium small square
      '\u2614\uFE0F', // umbrella with rain drops
      '\u2615\uFE0F', // hot beverage
      '\u2648\uFE0F', // Aries
      '\u2649\uFE0F', // Taurus
      '\u264A\uFE0F', // Gemini
      '\u264B\uFE0F', // Cancer
      '\u264C\uFE0F', // Leo
      '\u264D\uFE0F', // Virgo
      '\u264E\uFE0F', // Libra
      '\u264F\uFE0F', // Scorpius
      '\u2650\uFE0F', // Sagittarius
      '\u2651\uFE0F', // Capricorn
      '\u2652\uFE0F', // Aquarius
      '\u2653\uFE0F', // Pisces
      '\u267F\uFE0F', // wheelchair symbol
      '\u26AA\uFE0F', // medium white circle
      '\u26BD\uFE0F', // soccer ball
      '\u26BE\uFE0F', // baseball
      '\u26C4\uFE0F', // snowman without snow
      '\u26F2\uFE0F', // fountain
      '\u26F3\uFE0F', // flag in hole
      '\u26F5\uFE0F', // sailboat
      '\u26FA\uFE0F', // tent
      '\u2757\uFE0F', // heavy exclamation mark symbol
      '\u2B1B\uFE0F', // black large square
      '\u2B1C\uFE0F', // white large square
      '\u2B55\uFE0F', // heavy large circle
      '\u{1F004}\uFE0F', // mahjong tile red dragon
    ];

    for (const sequence of EXTRA_SEQUENCES) {
      test(sequence);
    }
  }

  // Test platform-specific emoji sequences
  for (const sequence of [
    // women wrestling: light skin tone (added to draft Emoji 17.0 in 2025)
    '\u{1F93C}\u{1F3FB}\u{200D}\u{2640}\u{FE0F}',
    // flag for Texas
    '\u{1F3F4}\u{E0075}\u{E0073}\u{E0074}\u{E0078}\u{E007F}',
    // ninja cat
    '\u{1F431}\u{200D}\u{1F464}',
  ]) {
    test(sequence);
  }

  it('does not match non-emoji sequences', () => {
    for (const char of [
      'A', '\u200D', '\u20E3', '\uFE0F',
      // Within \p{Emoji}
      '#', '*', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    ]) {
      assert.doesNotMatch(char, regex());
      assert.doesNotMatch(`${char}\uFE0F`, regex());
    }
  });

  it('matches adjacent emoji sequences as separate matches', () => {
    assert.strictEqual('\u{1F431}\u{1F464}'.match(regex()).length, 2);
    assert.strictEqual('🇧🇷🇯🇵🏳️‍🌈🇺🇸'.match(regex()).length, 4);
  });

  // it('contains no non-ASCII Unicode symbols', () => {
  //   const regexSource = regex().source;
  //   assert(/\\u\{/.test(regexSource) === false);
  // });

  it('can be imported as a JavaScript module', async () => {
    const { default: regex } = await import('../index.mjs');
    assert(regex().test('\u{1F600}'));
  });

});
