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
let startPosList: string[] = [];

lines.on('line', (l) => {
	if (!l.trim()) return;

	if (!movs) {
		movs = l.trim();
		return;
	}

	const arr = l.split('=');
	const nextEls = arr[1].trim().match(/[A-Z]+/g);

	const node = arr[0].trim();

	adj.set(node, {
		L: nextEls![0],
		R: nextEls![1],
	});

	if (node.endsWith('A')) {
		startPosList.push(node);
	}
});

const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));

lines.on('close', () => {
	let counts: number[] = [];
	let i = 0;

	for (const c of startPosList) {
		let pos = c;
		counts.push(0);
		while (!pos.endsWith('Z')) {
			pos = adj.get(pos)[movs[counts[i] % movs.length]].trim();
			counts[i]++;
		}
		i++;
	}

	console.log(counts.reduce((a, b) => (a * b) / gcd(a, b)));
});
