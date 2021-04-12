const list = [];

const pushToList = data => {
	Object.values(data).forEach(v => {
		if (typeof v === 'object') return pushToList(v);
		list.push(v);
	});
};

const getValues = object => {
	pushToList(Object.values(object));
	return list.map(i => `"${i}"`);
};

module.exports = {
	getValues,
};
