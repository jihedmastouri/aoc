package main

import (
	"os"
)

func main() {
	fileContent, err := os.ReadFile("./input")
	if err != nil {
		panic("failed to read file")
	}

	input := string(fileContent)
	a(input)
	b(input)
}
