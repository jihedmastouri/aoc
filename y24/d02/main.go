package main

import (
	"os"
	"strings"
)

func main() {
	fileContent, err := os.ReadFile("./input")
	if err != nil {
		panic("failed to read file")
	}

	input := strings.Split(strings.TrimSpace(string(fileContent)), "\n")
	a(input) // 686
	b(input) // 717
}
