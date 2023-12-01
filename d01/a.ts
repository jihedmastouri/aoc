import * as fs from 'node:fs';
import * as rl from 'node:readline';

const fileStream = fs.createReadStream('input');
const lines = rl.createInterface({ input: fileStream });

let sum = 0;

lines.on('line', (l) => {
	const nums = l.match(/[1-9]/g);
	if (nums) {
		sum += Number(`${nums[0]}${nums[nums?.length - 1]}`);
	}
});

lines.on('close', () => console.log(sum));
