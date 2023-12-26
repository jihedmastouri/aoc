import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import readline from 'node:readline';

const filename = process.argv.length > 2 ? process.argv[2] : 'input';
const location = path.join(__dirname, filename);

const fileStream = fs.createReadStream(location);
const lines = readline.createInterface({ input: fileStream });

let sum = 0;

lines.on('line', (l) => {
	if (!l) return;
	const [locations, numbersSrt] = l.trim().split(' ');
	const numbers = numbersSrt.trim().split(',').map(Number);
	sum += combos(locations, numbers).length;
});

lines.on('close', () => {
	console.log(sum);
});

function combos(locations: string, numbers: number[], index = 0): string[] {
	const v = verif(numbers);

	if (index === locations.length) {
		const matches = Array.from(locations.match(/#+/g) ?? []);
		return v(locations, '=') && matches.length === numbers.length ? [locations] : [];
	}

	if (locations[index] === '?') {
		const hashtag = `${locations.slice(0, index)}#${locations.slice(index + 1)}`;
		const first = v(hashtag.slice(0, index + 1), '<')
			? combos(hashtag, numbers, index + 1)
			: [];

		const point = `${locations.slice(0, index)}.${locations.slice(index + 1)}`;
		const second = v(point.slice(0, index + 1), '=') ? combos(point, numbers, index + 1) : [];

		return first.concat(second);
	}

	return combos(locations, numbers, index + 1);
}

function verif(nums: number[]) {
	return (s: string, sign: '=' | '<') => {
		const matches = Array.from(s.match(/#+/g) ?? []);
		return (
			matches.length <= nums.length &&
			{
				'=': matches.every((m, i) => nums[i] === m.length),
				'<': matches.every((m, i) => nums[i] >= m.length),
			}[sign]
		);
	};
}
