import fs from 'node:fs';
import path from 'node:path';
import rl from 'node:readline';

const location = path.join(__dirname, 'input');
const fileStream = fs.createReadStream(location);
const lines = rl.createInterface({ input: fileStream });

let sum = 0;

lines.on('line', (l) => {
	if (!l) return;

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

	if (n > 0) {
		sum += Math.pow(2, n - 1);
	}
});

lines.on('close', () => console.log(sum));
