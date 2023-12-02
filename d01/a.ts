import fs from 'node:fs';
import rl from 'node:readline';
import path from 'node:path';

const location = path.join(__dirname, 'input');
const fileStream = fs.createReadStream(location);
const lines = rl.createInterface({ input: fileStream });

let sum = 0;

lines.on('line', (l) => {
	const nums = l.match(/[1-9]/g);
	if (nums) {
		sum += Number(`${nums[0]}${nums[nums?.length - 1]}`);
	}
});

lines.on('close', () => console.log(sum));
