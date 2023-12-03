import fs from 'node:fs';
import path from 'node:path';
import rl from 'node:readline';

const location = path.join(__dirname, 'test');
const fileStream = fs.createReadStream(location);
const lines = rl.createInterface({ input: fileStream });

let idx = 0;
const nums: number[][][] = [];
let prevLine: string[] = [];

const strLookup = (str: string[], i: number) => {
	let leftN = '';
	let rightN = '';

	const isNum = (str: string[]) => (n: number) => !isNaN(Number(str[n]));
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
		const temp = str[i];
		return [Number(leftN + temp + rightN)];
	}

	const res = [];
	if (leftN !== '') res.push(Number(leftN));
	if (rightN !== '') res.push(Number(rightN));
	return res;
};

lines.on('line', (l) => {
	if (!l) return;

	nums.push([]);
	const chars = l.split('');

	for (let i = 0; i < chars.length; i++) {
		const char = chars[i];
		if (char === '*') {
			let temp = strLookup(chars, i);

			if (prevLine.length !== 0) {
				temp = [...temp, ...strLookup(prevLine, i)];
			}

			nums[idx].push(temp);
		}
	}

	let j = 0;
	for (let i = 0; i < prevLine.length; i++) {
		const char = prevLine[i];
		if (char === '*') {
			nums[idx - 1][j] = [...nums[idx - 1][j], ...strLookup(chars, i)];
			j++;
		}
	}

	prevLine = chars.slice();
	idx++;
});

lines.on('close', () =>
	console.log(
		nums.reduce(
			(acc, el) =>
				acc +
				el.reduce(
					(acc, el) =>
						el.flat().length !== 2
							? acc
							: acc + el.flat()[0] * el.flat()[1],
					0
				),

			0
		)
	)
);
