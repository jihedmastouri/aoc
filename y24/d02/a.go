package main

import (
	"fmt"
	"strconv"
	"strings"
)

func a(input []string) {
	res := 0

	for _, l := range input {
		arrStr := strings.Fields(l)

		if len(arrStr) < 2 {
			continue
		}

		nums1, _ := strconv.Atoi(arrStr[0])
		nums2, _ := strconv.Atoi(arrStr[1])

		isDec := false
		if nums1 > nums2 {
			isDec = true
		}

		valid := true
		for i := 0; i <= len(arrStr)-2; i++ {
			nums1, _ := strconv.Atoi(arrStr[i])
			nums2, _ := strconv.Atoi(arrStr[i+1])

			diff := nums2 - nums1
			if isDec {
				diff = nums1 - nums2
			}

			if diff > 3 || diff < 1 {
				valid = false
				break
			}
		}

		if valid {
			res++
		}
	}

	fmt.Println(res)
}
