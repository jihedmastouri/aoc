package main

import (
	"fmt"
	"strconv"
	"strings"
)

func checkIfValid(nums []int, pos int) bool {
	temp := make([]int, len(nums)-1)

	i, j := 0, 0
	for i < len(temp) {
		if j != pos {
			temp[i] = nums[j]
			i++
		}
		j++
	}

	isDec := false
	if temp[0] > temp[1] {
		isDec = true
	}

	isValid := true
	for i := 0; i < len(temp)-1; i++ {
		diff := temp[i+1] - temp[i]
		if isDec {
			diff = temp[i] - temp[i+1]
		}

		if diff > 3 || diff < 1 {
			isValid = false
			break
		}
	}

	if !isValid && nums[0] == 84 {
		fmt.Println(temp, nums)

	}

	return isValid
}

func b(input []string) {
	res := 0

	for _, l := range input {
		arrStr := strings.Fields(l)

		if len(arrStr) <= 2 {
			res++
			continue
		}

		nums := []int{}
		for _, val := range arrStr {
			n, _ := strconv.Atoi(val)
			nums = append(nums, n)
		}

		isDec := false
		// checking for index 1 not 0
		// to avoid wrong answ when first number is the outlier
		if nums[1] > nums[2] {
			isDec = true
		}

		isValid := true
		for i := 0; i < len(nums)-1; i++ {
			diff := nums[i+1] - nums[i]
			if isDec {
				diff = nums[i] - nums[i+1]
			}

			if diff > 3 || diff < 1 {
				isValid = (checkIfValid(nums, i) || checkIfValid(nums, i+1))
				break
			}
		}

		if isValid {
			res++
		}
	}
	fmt.Println(res)
}
