import fs from 'node:fs';
import path from 'node:path';
import rl from 'node:readline';

const location = path.join(__dirname, 'input');
const fileStream = fs.createReadStream(location);
const lines = rl.createInterface({ input: fileStream });

let sum = 0;
let prevLine: string[] = [];

const strLookup = (str: string[], i: number) => {
	let leftN = '';
	let rightN = '';

	const isNum = (str: string[]) => (n: number) => !isNaN(Number(str[n]));
	const isNumPos = isNum(str);

	if (isNumPos(i - 1)) {
		let idx = i - 1;
		while (isNumPos(idx)) {
			leftN = str[idx] + leftN;
			str[idx] = '.';
			idx--;
		}
	}

	if (isNumPos(i + 1)) {
		let idx = i + 1;
		while (isNumPos(idx)) {
			rightN += str[idx];
			str[idx] = '.';
			idx++;
		}
	}

	if (isNumPos(i)) {
		const temp = str[i];
		str[i] += '.';
		return Number(leftN + temp + rightN);
	}

	return Number(leftN) + Number(rightN);
};

lines.on('line', (l) => {
	if (!l) return;

	const chars = l.split('');

	for (let i = 0; i < chars.length; i++) {
		const char = chars[i];
		if (char !== '.' && isNaN(Number(char))) {
			sum += strLookup(chars, i);

			if (prevLine.length == 0) continue;
			sum += strLookup(prevLine, i);
		}
	}

	for (let i = 0; i < prevLine.length; i++) {
		const char = prevLine[i];
		if (char !== '.' && isNaN(Number(char))) {
			sum += strLookup(chars, i);
		}
	}
	prevLine = chars.slice();
});

lines.on('close', () => console.log(sum));
