package main

import (
	"fmt"
	"strconv"
	"strings"
)

// Oops started coding before finishing reading
func countSolves(nums []int, final int, prev int, sign string, index int) int {
	if index >= len(nums) {
		if prev == final {
			return 1
		}

		return 0
	}

	if prev > final {
		return 0
	}

	if sign == "+" {
		prev += nums[index]
	}

	if sign == "*" {
		if prev == 0 {
			prev = 1
		}
		prev *= nums[index]
	}

	if prev >= final {
		return 0
	}

	return countSolves(nums, final, prev, "+", index+1) + countSolves(nums, final, prev, "*", index+1)
}

func verifySolve(nums []int, final int, prev int, sign string, index int) bool {
	if index >= len(nums) {
		if prev == final {
			return true
		}

		return false
	}

	if prev > final {
		return false
	}

	if sign == "+" {
		prev += nums[index]
	}

	if sign == "*" {
		if prev == 0 {
			prev = 1
		}
		prev *= nums[index]
	}

	return verifySolve(nums, final, prev, "+", index+1) || verifySolve(nums, final, prev, "*", index+1)
}

func a(input []string) {
	res := 0

	for _, l := range input {

		temp := strings.SplitN(l, ":", 2)
		final, _ := strconv.Atoi(temp[0])

		numberStrs := strings.Fields(strings.TrimSpace(temp[1]))
		nums := make([]int, len(numberStrs))
		for j, s := range numberStrs {
			num, _ := strconv.Atoi(s)
			nums[j] = num
		}

		if verifySolve(nums, final, 0, "+", 0) || verifySolve(nums, final, 0, "*", 0) {
			res += final
		}
	}

	fmt.Println(res)

}
