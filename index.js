const fs = require('fs');
const CSVToJSON = require('csvtojson');
const { getValues } = require('./utils');
const en = fs.readFileSync('en.json', { encoding: 'utf-8' });

const source = getValues(JSON.parse(en));

const generateFile = data => {
    const lang = data.shift().toLowerCase();

    let json = en;
    source.forEach((item, i) => json = json.replace(item, data[i]));

    fs.writeFileSync(`locales/${lang}.json`, json);
    console.log(`${lang.toUpperCase()} created successfully!`);
};

(async () => {

    const items = await CSVToJSON().fromFile('file.csv');

    const headers = Object.keys(items[0]);

    const mapped = headers.map(header => {
        const mapItems = items.map(i => i[header]);
        return [header, ...mapItems];
    });

    // remove & create dir
    const dir = './locales'
    if(fs.existsSync(dir)) fs.rmdirSync(dir, { recursive: true });
    fs.mkdirSync(dir);

    // generate all fikes
    mapped.forEach(generateFile);
})();