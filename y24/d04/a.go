package main

import (
	"fmt"
	"strings"
)

type direction struct {
	x, y int
}

var (
	LEFT        = direction{0, -1}
	RIGHT       = direction{0, 1}
	TOP         = direction{-1, 0}
	BOTTOM      = direction{1, 0}
	TOPLEFT     = direction{-1, -1}
	TOPRIGHT    = direction{-1, 1}
	BOTTOMLEFT  = direction{1, -1}
	BOTTOMRIGHT = direction{1, 1}
)

func foundChar(m [][]string, x, y int, char string, dir direction) bool {
	nextChar := "A"
	if char == "A" {
		nextChar = "S"
	}

	i, j := x+dir.x, y+dir.y

	// missunderstood overlapping
	// for i < len(m) && i >= 0 && j < len(m[i]) && j >= 0 && m[i][j] != char {
	// 	i, j = i+dir.x, j+dir.y
	// }

	if i < len(m) && i >= 0 && j < len(m[i]) && j >= 0 && m[i][j] == char {
		if char == "S" {
			return true
		}
		return foundChar(m, i, j, nextChar, dir)
	}

	return false
}

func validateXMAS(m [][]string, x, y int) int {
	res := 0

	allDirs := []direction{
		LEFT,
		RIGHT,
		TOP,
		BOTTOM,
		TOPLEFT,
		TOPRIGHT,
		BOTTOMLEFT,
		BOTTOMRIGHT,
	}

	for _, dir := range allDirs {
		if ok := foundChar(m, x, y, "M", dir); ok {
			res++
		}
	}

	return res
}

func a(input []string) {
	matrix := make([][]string, len(input))
	for i, row := range input {
		matrix[i] = strings.Split(strings.TrimSpace(row), "")
	}

	res := 0
	for i := 0; i < len(matrix); i++ {
		for j := 0; j < len(matrix[i]); j++ {
			if matrix[i][j] == "X" {
				res += validateXMAS(matrix, i, j)
			}
		}
	}

	fmt.Println(res)
}
