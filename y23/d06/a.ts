import fs from 'node:fs';
import path from 'node:path';

const location = path.join(__dirname, 'input');
const data = fs.readFileSync(location, 'utf8');

const [times, distances] = data
	.trim()
	.split('\n')
	.map((l) =>
		l
			.split(':')[1]
			.trim()
			.match(/\d+/g)!
			.map((el) => Number(el.trim()))
	);

let res = 1;

for (let index = 0; index < times.length; index++) {
	let count = 0;
	let speed = 1;

	while (speed < times[index]) {
		if (speed * (times[index] - speed) > distances[index]) count++;
		speed++;
	}

	if (count > 0) res *= count;
}

console.log(res);
