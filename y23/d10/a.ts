/*
 *
 *
 * YOU NEED TO INCREASE THE STACK SIZE
 * (I've already spent too much time on a recusive solution.
 * I am not going to throw it away)
 *
 *
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const filename = process.argv.length > 2 ? process.argv[2] : 'input';
const location = path.join(__dirname, filename);
const content = fs.readFileSync(location, 'utf8');

type Directions = 'left' | 'right' | 'up' | 'down';

const dirs: Record<Directions, [number, number]> = {
	left: [0, -1],
	right: [0, 1],
	up: [-1, 0],
	down: [1, 0],
};

const tiles: Record<string, Directions[]> = {
	'|': ['up', 'down'],
	'-': ['left', 'right'],
	L: ['up', 'right'],
	J: ['left', 'up'],
	'7': ['left', 'down'],
	F: ['down', 'right'],
	'.': [],
};

const startPos = [0, 0];
let sFound = false;

const maze = content
	.trim()
	.split('\n')
	.map((l, i) => {
		const els = l.trim().split('');
		if (!sFound) {
			els.forEach((el, j) => {
				if (el === 'S') {
					sFound = true;
					startPos[0] = i;
					startPos[1] = j;
				}
			});
		}
		return els;
	});

const vis = Array.from({ length: maze[0].length }, () =>
	Array.from({ length: maze.length }, () => false)
);

const res = walk([startPos[0], startPos[1] - 1], 1, vis);
console.log((res + 1) / 2);

function walk(coord: [number, number], distance: number, vis: boolean[][]) {
	const tileName = maze[coord[0]][coord[1]];

	if (tileName === 'S') return distance;

	vis[coord[0]][coord[1]] = true;

	const distances: number[] = [];

	for (const d of tiles[tileName]) {
		const nextRow = coord[0] + dirs[d][0];
		const nextCol = coord[1] + dirs[d][1];

		if (nextRow >= maze.length || nextCol >= maze[0].length) continue;

		const next = maze[nextRow][nextCol];
		if (!allowedDir(d, next) || vis[nextRow][nextCol] || next === '.') continue;

		distances.push(walk([nextRow, nextCol], distance + 1, vis));
	}

	return distances.length == 0 ? distance : Math.max(...distances);
}

function allowedDir(direction: Directions, next: keyof typeof tiles) {
	switch (direction) {
		case 'left':
			return ['-', 'L', 'F'].includes(next) ? true : false;
		case 'right':
			return ['-', '7', 'J'].includes(next) ? true : false;
		case 'up':
			return ['|', '7', 'F'].includes(next) ? true : false;
		case 'down':
			return ['|', 'L', 'J'].includes(next) ? true : false;
	}
}
