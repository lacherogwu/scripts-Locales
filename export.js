const fs = require('fs');
const en = require('./en.json');
const { getValues } = require('./utils');

const file = ['"EN"', ...getValues(en)];
console.log(file);

fs.writeFileSync('translations.csv', file.join('\n'));
console.log('Done! ./translations.csv');
