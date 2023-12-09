import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import readline from 'node:readline';

const filename = process.argv.length > 2 ? process.argv[2] : 'input';
const location = path.join(__dirname, filename);
const fileStream = fs.createReadStream(location);
const lines = readline.createInterface({ input: fileStream });

const adj = new Map();
let movs = '';

lines.on('line', (l) => {
	if (!l.trim()) return;

	if (!movs) {
		movs = l.trim();
		return;
	}

	const arr = l.split('=');
	const nextEls = arr[1].trim().match(/[A-Z]+/g);

	adj.set(arr[0].trim(), {
		L: nextEls![0],
		R: nextEls![1],
	});
});

lines.on('close', () => {
	let count = 0;
	let pos = 'AAA';

	while (pos !== 'ZZZ') {
		pos = adj.get(pos)[movs[count % movs.length]].trim();
		count++;
	}

	console.log(count);
});
