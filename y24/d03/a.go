package main

import (
	"fmt"
	"regexp"
	"strconv"
)

func a(input string) {
	var res uint64 = 0

	re := regexp.MustCompile(`mul\(\d{1,3},\d{1,3}\)`)
	reNum := regexp.MustCompile(`[1-9][0-9]*`)

	arr := re.FindAllString(input, -1)

	for _, s := range arr {
		numStrs := reNum.FindAllString(s, 2)

		num1, _ := strconv.ParseUint(numStrs[0], 10, 64)
		num2, _ := strconv.ParseUint(numStrs[1], 10, 64)

		res += (num1 * num2)
	}

	fmt.Println(res)
}
