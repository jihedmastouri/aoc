import fs from 'node:fs';
import path from 'node:path';
import rl from 'node:readline';

const location = path.join(__dirname, 'input');
const fileStream = fs.createReadStream(location);
const lines = rl.createInterface({ input: fileStream });

let idx = 0;
let sum = 0;
let prevLine: string = '';
let prevNums: number[][] = [];

const strLookup = (str: string, i: number) => {
	let leftN = '';
	let rightN = '';

	const isNum = (str: string) => (n: number) => !isNaN(Number(str[n]));
	const isNumPos = isNum(str);

	if (isNumPos(i - 1)) {
		let index = i - 1;
		while (isNumPos(index)) {
			leftN = str[index] + leftN;
			index--;
		}
	}

	if (isNumPos(i + 1)) {
		let index = i + 1;
		while (isNumPos(index)) {
			rightN += str[index];
			index++;
		}
	}

	if (isNumPos(i)) {
		return [Number(leftN + str[i] + rightN)];
	}

	const res = [];
	if (leftN !== '') res.push(Number(leftN));
	if (rightN !== '') res.push(Number(rightN));
	return res;
};

lines.on('line', (l) => {
	if (!l) return;

	let temp: number[][] = [];

	for (let i = 0; i < l.length; i++) {
		const char = l[i];
		if (char === '*') {
			let tp = strLookup(l, i);

			if (prevLine.length !== 0) {
				tp = [...tp, ...strLookup(prevLine, i)];
			}

			temp.push(tp);
		}
	}

	let j = 0;
	for (let i = 0; i < prevLine.length; i++) {
		const char = prevLine[i];
		if (char === '*') {
			prevNums[j] = [...prevNums[j], ...strLookup(l, i)];
			j++;
		}
	}

	sum += prevNums.reduce(
		(acc, el) => (el.length !== 2 ? acc : acc + el[0] * el[1]),
		0
	);

	prevLine = l;
	prevNums = temp.map(el => el.slice());
	idx++;
});

lines.on('close', () => console.log(sum));
