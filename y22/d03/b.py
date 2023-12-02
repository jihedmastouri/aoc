def priority_calc(c : str) -> int:
    asc = ord(c)
    if asc < 97:
        # this line here caused me so much trouble
        return asc - 64 + 26
    else:
        return asc - 96 

res = 0
with open("input.txt", "r") as f:
    lines = f.readlines()
    num_lines = len(lines)
    for i in range(0, num_lines - 3, 3):
        hasher = {}

        for c in lines[i][:-1]: 
            hasher[c] = 1

        for c in lines[i+1][:-1]:
            if hasher.get(c) == 1:
                    hasher[c] += 1

        for c in lines[i+2][:-1]:
            if hasher.get(c) == 2:
                    res += priority_calc(c)
                    hasher[c] += 1
print(res)

