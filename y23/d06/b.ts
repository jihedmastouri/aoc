import fs from 'node:fs';
import path from 'node:path';

const location = path.join(__dirname, 'input');
const data = fs.readFileSync(location, 'utf8');

const [time, distance] = data
	.trim()
	.split('\n')
	.map((l) => l.split(':')[1].trim().match(/\d+/g)!.join(''))
	.map(Number);

let count = 0;
let speed = 1;

while (speed < time) {
	if (speed * (time - speed) > distance) count++;
	speed++;
}

console.log(count);
