import fs from 'node:fs';
import path from 'node:path';
import rl from 'node:readline';

const location = path.join(__dirname, 'input');
const fileStream = fs.createReadStream(location);
const lines = rl.createInterface({ input: fileStream });

let sum = 0;

lines.on('line', (l) => {
	if (!l) return;

	const track = {
		red: 0,
		green: 0,
		blue: 0,
	};

	const blocks = l.split(':')[1].split(';');
	const colors = blocks.map((b) => b.split(',').map((el) => el.split(' ')));

	for (const pull of colors) {
		for (const c of pull) {
			//@ts-ignore
			track[c[2]] = Math.max(track[c[2]], Number(c[1]));
		}
	}

	sum += Object.keys(track).reduce(
		//@ts-ignore
		(acc, k) => acc * track[k],
		1
	);
});

lines.on('close', () => console.log(sum));
