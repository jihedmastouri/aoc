import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const filename = process.argv.length > 2 ? process.argv[2] : 'input';
const location = path.join(__dirname, filename);
const content = fs.readFileSync(location, 'utf8');

let lines = content.trim().split('\n');

const emptyLines: number[] = [];
lines.forEach((el, index) => {
	const res = el.trim().match(/\#/g);
	if (res === null) {
		emptyLines.push(index);
	}
});

const universe = lines.map((el) => el.trim().split(''));

const emptyColumns: number[] = [];
for (let i = 0; i < universe[0].length; i++) {
	let clean = true;
	for (let j = 0; j < universe.length; j++) {
		if (universe[j][i] === '#') clean = false;
	}

	if (clean) {
		emptyColumns.push(i);
	}
}

const locations: number[][] = [];
universe.forEach((l, i) =>
	l.forEach((sign, j) => {
		if (sign === '#') locations.push([i, j]);
	})
);

const MILLION = 1_000_000;
let res = 0;

for (let i = 0; i < locations.length - 1; i++) {
	for (let j = i + 1; j < locations.length; j++) {
		const xGaps = emptyLines.filter((el) =>
			inRange(el, locations[i][0], locations[j][0])
		).length;
		const yGaps = emptyColumns.filter((el) =>
			inRange(el, locations[i][1], locations[j][1])
		).length;
		res +=
			Math.abs(locations[i][0] - locations[j][0]) +
			Math.abs(locations[i][1] - locations[j][1]) +
			xGaps * MILLION -
			xGaps +
			yGaps * MILLION -
			yGaps;
	}
}

console.log(res);

function inRange(n: number, x1: number, x2: number) {
	return n >= Math.min(x1, x2) && n <= Math.max(x1, x2);
}
