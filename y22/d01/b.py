cal = 0
max_cal = [0,0,0]
with open("input.txt", "r") as f:
    for line in f.readlines():
        if len(line.strip()) == 0 :
            max_cal[2] = max(cal,max_cal[2])
            # swap values until the biggest cal is at pos 0
            if max_cal[2] >  max_cal[1]:
                max_cal[2], max_cal[1] = max_cal[1], max_cal[2]
                if max_cal[0] <  max_cal[1]:
                    max_cal[0], max_cal[1] = max_cal[1], max_cal[0]
            cal = 0
        else:
            cal = cal + int(line[:-1])
print(sum(max_cal))
