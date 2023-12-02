def priority_calc(c : str) -> int:
    asc = ord(c)
    if asc < 97:
        # this line here caused me so much trouble
        return asc - 64 + 26
    else:
        return asc - 96 

res = 0
with open("input.txt", "r") as f:
    for line in f.readlines():
        hasher = {}
        found = {}
        l = line.strip()
        len_l = len(l)
        if len_l != 0 :
            half = len_l // 2
            for c in l[:half]: 
                hasher[c] = True
            for c in l[half:]:
                if hasher.get(c):
                    # Also this condition
                    if not found.get(c):
                        found[c] = True
                        res += priority_calc(c)
print(res)

