package main

import (
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
)

func main() {
	fileContent, err := os.ReadFile("./input")
	if err != nil {
		panic("failed to read file")
	}

	data := strings.Split(strings.TrimSpace(string(fileContent)), "\n")

	var sum1, sum2 int64

	for _, line := range data {
		if line == "" {
			continue
		}

		parts := strings.Fields(line)

		intVal1, _ := strconv.Atoi(parts[0])
		sum1 += int64(intVal1)

		intVal2, _ := strconv.Atoi(parts[1])
		sum2 += int64(intVal2)
	}

	res := sum1 - sum2

	fmt.Printf("%.0f\n", math.Abs(float64(res)))
}
