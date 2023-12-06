import fs from 'node:fs';
import path from 'node:path';
import rl from 'node:readline';

const location = path.join(__dirname, 'input');
const fileStream = fs.createReadStream(location);
const lines = rl.createInterface({ input: fileStream });

let sum = 0;
let idx = 0;
const repeats = [1];

lines.on('line', (l) => {
	if (!l) return;
	if (!repeats[idx] || repeats[idx] < 1) repeats[idx] = 1;

	const cards = l.split(':')[1].split('|');
	const M: Record<string, boolean> = {};

	const numbersCard1 = cards[0].trim().split(' ');
	const numbersCard2 = cards[1].trim().split(' ');

	for (let num of numbersCard1) {
		if (!isNaN(parseInt(num))) M[num] = true;
	}

	let n = 0;
	for (let num of numbersCard2) {
		if (M[num]) {
			n++;
			M[num] = false;
		}
	}

	for (let i = 0; i < n; i++) {
		const temp =
			repeats[idx + i + 1] !== undefined ? repeats[idx + i + 1] : 1;
		repeats[idx + i + 1] = temp + repeats[idx];
	}

	sum += repeats[idx];
	idx++;
});

lines.on('close', () => console.log(sum));
