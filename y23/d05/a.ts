import fs from 'node:fs';
import path from 'node:path';

const location = path.join(__dirname, 'input');
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

const locations: number[] = [];

const findLocation = (prev: number, index = 0) => {
	if (elements[index] === undefined) {
		locations.push(prev);
		return;
	}

	let newEl = prev;
	elements[index].forEach((el) => {
		const diff = el[1] + el[2] - prev;
		if (diff >= 0 && el[1] <= prev) {
			newEl = el[0] + prev - el[1];
		}
	});

	findLocation(newEl, index + 1);
};

seeds.forEach((s) => findLocation(s));

console.log(locations.reduce((acc, el) => Math.min(acc, el), locations[0]));
