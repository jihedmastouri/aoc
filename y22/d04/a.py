import re

res = 0

with open("input.txt", "r") as f:
    for line in f.readlines():
        l = [ int(x) for x in re.findall(r'\d+',line)]
        if l:
            if (l[0] <= l[2] and l[3] <= l[1]) or (l[2] <= l[0] and l[1] <= l[3]):
                res += 1

print(res)
