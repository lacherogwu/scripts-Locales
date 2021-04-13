const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');
const en = require('./en.json');
const headers = ['key', 'EN'];

const method = process.argv[2] || 'import';

const list = [];

const getValue = (key, value) => {
	if (typeof value === 'string') list.push([key, `"${value.replaceAll('"', '""')}"`]);
	else {
		return Object.entries(value).map(([k, v]) => getValue(key ? `${key}.${k}` : k, v));
	}
};

const importFile = () => {
	list.push(headers);
	getValue('', en);

	const file = list.map(i => i.join(',')).join('\n');
	fs.writeFileSync('translations.csv', file);

	console.log('Done! ./translations.csv');
};

const fixComma = item => {
	const start = item.findIndex(a => /^"/.test(a));
	const end = item.findIndex(a => /"$/.test(a));

	const text = item.slice(start, end + 1).join();

	item.splice(start, end, text);

	return item;
};

const fixText = item => {
	item = item.replaceAll('""', '"');
	if (item[0] !== '"' || item[item.length - 1] !== '"') return item;
	return item.substring(1, item.length - 1);
};

const setProp = (obj, key, value) => {
	const split = key.split('.');
	const last = split.pop();
	const current = split.reduce((acc, curr) => (acc[curr] ||= {}), obj);
	current[last] = value;
};

const exportFile = async () => {
	const extension = 'xlsx';

	let file;
	if (extension === 'xlsx') {
		const rows = await readXlsxFile('file.xlsx');
		file = rows.map(i => i.join(','));
	} else {
		// csv
		file = fs.readFileSync('file.csv', 'utf-8').replaceAll('\r', '');
		file = file.split('\n');
	}

	const head = file.shift().split(',');
	const columns = head.length;
	head.shift();

	const files = {};

	head.forEach((h, index) => {
		const data = {};
		file.forEach(item => {
			item = item.split(',');
			if (item.length > columns) item = fixComma(item);

			const val = fixText(item[index + 1]);
			setProp(data, item[0], val);
		});
		files[h] = data;
	});

	const path = 'locales';
	Object.entries(files).forEach(([key, value]) => {
		if (!fs.existsSync(path)) fs.mkdirSync(path);
		fs.writeFileSync(`${path}/${key.toLowerCase()}.json`, JSON.stringify(value));
	});
	console.log('Done! all files exported to ./locales folder');
};

switch (method) {
	case 'import':
		importFile();
		break;
	case 'export':
		exportFile();
		break;
	default:
		throw new Error('method is required (import / export)');
}
