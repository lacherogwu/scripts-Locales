const fs = require('fs');

let json = fs.readFileSync('import/data.json', { encoding: 'utf-8' });
const source = fs.readFileSync('import/source.txt', { encoding: 'utf-8' }).split('\n');
const translated = fs.readFileSync('import/translated.txt', { encoding: 'utf-8' }).split('\n');

source.forEach((line, i) => json = json.replace(line, translated[i]));

const lang = 'ua';
fs.writeFileSync(`import/${lang}.json`, json);