import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const filename = process.argv.length > 2 ? process.argv[2] : 'input';
const location = path.join(__dirname, filename);
const data = fs.readFileSync(location, 'utf8');

const convertFunction = (str: string): number => {
	const charCount: Record<string, number> = {};
	let numberOfJ = 0;
	for (const char of str) {
		if (char === 'J') {
			numberOfJ++;
			continue;
		}
		charCount[char] = (charCount[char] || 0) + 1;
	}

	const counts = Object.values(charCount).sort((a, b) => b - a);

	if (counts.length == 0) counts.push(numberOfJ);
	else counts[0] += numberOfJ;

	return counts[0] === 3 && counts[1] === 2
		? 3.5
		: counts[0] === 2 && counts[1] === 2
		  ? 2.5
		  : counts[0];
};

const content = data
	.trim()
	.split('\n')
	.map((line) => {
		const [cards, valueStr] = line.trim().split(' ');
		return {
			cards,
			value: Number(valueStr),
			score: convertFunction(cards),
		};
	});

const cardValues = [
	...['A', 'K', 'Q', 'T'],
	...Array.from({ length: 8 }, (_, i) => i + 2).reverse(),
	'J',
].reverse();

const helper = (a: string) => (!isNaN(parseInt(a)) ? +a : a);
content.sort((a, b) => {
	const scoreDiff = a.score - b.score;
	if (scoreDiff !== 0) {
		return scoreDiff;
	}

	for (let i = 0; i < 5; i++) {
		const aScore = cardValues.indexOf(helper(a.cards[i]));
		const bScore = cardValues.indexOf(helper(b.cards[i]));
		if (aScore !== bScore) {
			return aScore > bScore ? 1 : -1;
		}
	}

	return 0;
});

console.log(content.reduce((acc, el, i) => acc + el.value * (i + 1), 0));
