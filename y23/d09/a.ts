import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import readline from 'node:readline';

const filename = process.argv.length > 2 ? process.argv[2] : 'input';
const location = path.join(__dirname, filename);
const fileStream = fs.createReadStream(location);
const lines = readline.createInterface({ input: fileStream });

let sols: number[] = [];

lines.on('line', (l) => {
	const trimmed = l.trim();
	if (!trimmed) return;

	let nums = trimmed.split(' ').map((el) => Number(el));
	let lastVals = [nums[nums.length - 1]];

	while (!nums.every((el) => el === 0) && nums.length > 1) {
		let temp: number[] = [];

		for (let i = 0; i < nums.length - 1; i++) {
			temp.push(nums[i + 1] - nums[i]);
		}
		nums = temp;

		const lastVal = nums[nums.length - 1];

		lastVals.push(lastVal);
	}

	if (nums[0] !== 0) {
		lastVals.push(0);
	}

	sols.push(lastVals.reduceRight((a, b) => a + b));
});

lines.on('close', () => {
	console.log(sols.reduce((a, b) => a + b));
});
