cal = 0
max_cal = 0
with open("input.txt", "r") as f:
    for line in f.readlines():
        # if line is not empty
        if len(line.strip()) == 0 :
            max_cal = max(cal, max_cal)
            cal = 0
        else:
            # remove last character '\n'
            line = line[:-1]
            cal = cal + int(line)
print(max_cal)

