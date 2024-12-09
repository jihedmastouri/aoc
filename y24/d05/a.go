package main

import (
	"fmt"
	"slices"
	"strconv"
	"strings"
)

func validateLine(numbers []int, m map[int][]int, pos int) bool {
	num := numbers[pos]
	for i := pos; i < len(numbers); i++ {
		if arr, ok := m[num]; ok {
			if slices.Contains(arr, numbers[i]) {
				return false
			}
		}
	}
	return true
}

func a(input []string) {
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

		if valid {
			res += numbers[len(numbers)/2]
		}
	}

	fmt.Println(res)
}
