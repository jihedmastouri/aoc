import fs from 'node:fs';
import rl from 'node:readline';
import path from 'node:path';

const location = path.join(__dirname, 'input');
const fileStream = fs.createReadStream(location);
const lines = rl.createInterface({ input: fileStream });

const arr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
let sum = 0;

const toNum = (a: string) => (isNaN(Number(a)) ? arr.indexOf(a) + 1 : Number(a));

lines.on('line', (l) => {
	if (!l) return;

	let first = '';
	let last = '';

	for (let i = 0; i < l.length; i++) {
		if (!isNaN(Number(l[i]))) {
			if (first == '') first = l[i];
			last = l[i];
		}

		const str = l.substring(i);
		for (let w of arr) {
			if (str.startsWith(w)) {
				if (first == '') first = w;
				last = w;
			}
		}
	}

	const str = `${toNum(first!)}${toNum(last!)}`;
	sum += Number(str);
});

lines.on('close', () => console.log(sum));
