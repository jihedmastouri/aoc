import fs from 'node:fs';
import path from 'node:path';

const location = path.join(__dirname, 'test');
const data = fs.readFileSync(location, 'utf8');

const lines = data.split('\n\n').filter((line) => line.trim() != '');

const seeds = lines.shift()!.split(':')[1].trim().split(' ').map(Number);

const extract = (line: string) =>
	line
		.split(':\n')[1]
		.trim()
		.split('\n')
		.map((l) => l.trim().split(' ').map(Number));

const elements = lines.map(extract);

const findLocation = (prev: number, index = 0): number => {
	// BUG: Optimize this function...
	// it runs forever (and sometimes out of memory xD)
	if (elements[index] === undefined) {
		return prev;
	}

	let newEl = prev;
	elements[index].forEach((el) => {
		const diff = el[1] + el[2] - prev;

		if (diff >= 0 && el[1] <= prev) {
			newEl = el[0] + prev - el[1];
			// mem.set([el[1], el[1] + el[2], index], res);
		}
	});

	const res = findLocation(newEl, index + 1);
	return res;
};

let sol = Infinity;
for (let i = 0; i < seeds.length - 1; i += 2) {
	const seedMin = seeds[i];
	const seedRange = seeds[i + 1];


	for (let j = 0; j < seedRange; j++) {
		sol = Math.min(sol, findLocation(seedMin + j))
	}
}

// console.log(locations.reduce((acc, el) => Math.min(acc, el), locations[0]));
console.log(sol)
