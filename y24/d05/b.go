package main

import (
	"fmt"
	"slices"
	"strconv"
	"strings"
)

func reorder(m map[int][]int, numbers []int) []int {
	newNumbers := make([]int, len(numbers))
	copy(newNumbers, numbers)

	slices.SortStableFunc(newNumbers, func(i, j int) int {
		if arr, ok := m[i]; ok {
			if slices.Contains(arr, j) {
				return 1
			}
		}

		if arr, ok := m[j]; ok {
			if slices.Contains(arr, i) {
				return -1
			}
		}

		return 0
	})

	return newNumbers
}

func b(input []string) {
	shouldbeAfterRuleMap := make(map[int][]int)

	checkLineBegins := 0

	for i, line := range input {
		checkLineBegins = i
		if line == "" {
			break
		}

		rule := strings.FieldsFunc(strings.TrimSpace(line), func(r rune) bool {
			if r == '|' {
				return true
			}
			return false
		})

		num1, _ := strconv.Atoi(rule[0])
		num2, _ := strconv.Atoi(rule[1])

		if arr, ok := shouldbeAfterRuleMap[num2]; ok {
			if !slices.Contains(shouldbeAfterRuleMap[num2], num1) {
				shouldbeAfterRuleMap[num2] = append(arr, num1)
			}
		} else {
			shouldbeAfterRuleMap[num2] = []int{num1}
		}
	}

	res := 0
	for i := checkLineBegins + 1; i < len(input); i++ {
		numberStrs := strings.FieldsFunc(strings.TrimSpace(input[i]), func(r rune) bool {
			if r == ',' {
				return true
			}
			return false
		})

		numbers := make([]int, len(numberStrs))
		for j, s := range numberStrs {
			num, _ := strconv.Atoi(s)
			numbers[j] = num
		}

		valid := true
		for j := range numbers {
			if !validateLine(numbers, shouldbeAfterRuleMap, j) {
				valid = false
				break
			}
		}

		if !valid {
			newNumbers := reorder(shouldbeAfterRuleMap, numbers)
			res += newNumbers[len(newNumbers)/2]
		}
	}

	fmt.Println(res)
}
