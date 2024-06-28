// Tests copied from emoji-regex 10.3.0 by @mathiasbynens; MIT License
// <https://github.com/mathiasbynens/emoji-regex>

function getUnicodeDataDependency() {
  const pkg = require('../package.json');
  for (const name of Object.keys(pkg.devDependencies)) {
    if (name.startsWith('@unicode/unicode-')) {
      return name;
    }
  }
  throw new Error('No @unicode/unicode-* devDependency found');
}

const unicodeDataPackage = getUnicodeDataDependency();
module.exports = unicodeDataPackage;
