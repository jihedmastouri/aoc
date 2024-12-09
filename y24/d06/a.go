package main

import (
	"fmt"
	"slices"
	"strings"
)

type direction struct {
	x, y int
}

var (
	TOP    = direction{-1, 0}
	RIGHT  = direction{0, 1}
	LEFT   = direction{0, -1}
	BOTTOM = direction{1, 0}
)

func a(input []string) {
	res := 1
	var guardpos direction

	m := make([][]string, len(input))
	for i, l := range input {
		m[i] = strings.Split(l, "")
		if index := slices.Index(m[i], "^"); index != -1 {
			guardpos.x = i
			guardpos.y = index
		}
	}

	dir := 0
	allDirection := []direction{TOP, RIGHT, BOTTOM, LEFT}

	for {
		nexPos := direction{guardpos.x + allDirection[dir].x, guardpos.y + allDirection[dir].y}

		if nexPos.x >= len(m) || nexPos.x < 0 || nexPos.y < 0 || nexPos.y >= len(m[0]) {
			break
		}

		if m[nexPos.x][nexPos.y] == "#" {
			dir = (dir + 1) % len(allDirection)
			continue
		}

		if m[nexPos.x][nexPos.y] == "." {
			res++
			m[nexPos.x][nexPos.y] = "X"
		}

		guardpos.x = nexPos.x
		guardpos.y = nexPos.y
	}

	fmt.Println(res)
}
