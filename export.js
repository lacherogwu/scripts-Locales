const data = require('./export/data.json');
const fs = require('fs');

const list = ['EN'];

const pushToList = data => {
    Object.values(data).forEach(v => {
        if(typeof v === 'object') return pushToList(v)
        list.push(v);
    });
};

pushToList(Object.values(data));
fs.writeFileSync('export/translations.csv', list.join('\n'));