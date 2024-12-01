package main

import (
	"fmt"
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

	arr1, arr2 := []int{}, []int{}

	for _, line := range data {
		if line == "" {
			continue
		}

		parts := strings.Fields(line)

		intVal1, _ := strconv.Atoi(parts[0])
		arr1 = append(arr1, intVal1)

		intVal2, _ := strconv.Atoi(parts[1])
		arr2 = append(arr2, intVal2)
	}

	m := make(map[int]int)

	for _, el := range arr2 {
		if _, ok := m[el]; ok {
			m[el]++
		} else {
			m[el] = 1
		}
	}

	acc := 0
	for _, val := range arr1 {
		if occ, ok := m[val]; ok {
			acc += val * occ
		}
	}

	fmt.Printf("%d\n", acc)
}
