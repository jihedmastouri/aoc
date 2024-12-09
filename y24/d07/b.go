package main

import (
	"fmt"
	"math"
	"strconv"
	"strings"
)

func verifySolve2(nums []int, final int, prev int, sign string, index int) bool {
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

	if sign == "||" && prev != 0 {
		coef := math.Log10(float64(nums[index]))
		multiplier := int(math.Pow10(int(coef) + 1))
		prev = prev*multiplier + nums[index]
	}

	if sign == "*" {
		if prev == 0 {
			prev = 1
		}
		prev *= nums[index]
	}

	return verifySolve2(nums, final, prev, "+", index+1) ||
		verifySolve2(nums, final, prev, "*", index+1) ||
		verifySolve2(nums, final, prev, "||", index+1)
}

func b(input []string) {
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

		if verifySolve2(nums, final, 0, "+", 0) ||
			verifySolve2(nums, final, 0, "*", 0) ||
			verifySolve2(nums, final, 0, "||", 0) {
			res += final
		}
	}

	fmt.Println(res)

}
