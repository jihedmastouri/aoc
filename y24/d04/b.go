package main

import (
	"fmt"
	"strings"
)

func validateXShapeMAS(m [][]string, x, y int) bool {
	allDiags := [][]direction{
		{
			TOPLEFT,
			BOTTOMRIGHT,
		},
		{
			TOPRIGHT,
			BOTTOMLEFT,
		},
	}

	for _, diag := range allDiags {
		first := "."
		for _, dir := range diag {
			i, j := x+dir.x, y+dir.y

			if i >= len(m) || i < 0 || j >= len(m[i]) || j < 0 || !(m[i][j] == "M" || m[i][j] == "S") || m[i][j] == first {
				return false
			}

			first = m[i][j]
		}
	}

	return true

}

func b(input []string) {
	matrix := make([][]string, len(input))
	for i, row := range input {
		matrix[i] = strings.Split(strings.TrimSpace(row), "")
	}

	res := 0
	for i := 0; i < len(matrix); i++ {
		for j := 0; j < len(matrix[i]); j++ {
			if matrix[i][j] == "A" && validateXShapeMAS(matrix, i, j) {
				res++
			}
		}
	}

	fmt.Println(res)
}
