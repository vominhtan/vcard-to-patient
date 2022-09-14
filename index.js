// run `node index.js` in the terminal
const fs = require('fs');
const vCardParser = require('./lib/vcard-parser');

console.log(`Hello Node.js v${process.versions.node}!`);

const fileName = process.argv[2];

fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  fs.writeFileSync(`${fileName}.json`, JSON.stringify(vCardParser.parse(data)));
});
