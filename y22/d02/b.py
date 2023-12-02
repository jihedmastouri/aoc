wins = {
        "A":"C",
        "B": "A",
        "C": "B"
        }

pt = {
        "A": 1,
        "B": 2,
        "C": 3
        }

pts = 0
with open("input.txt",'r') as f:
    for line in f.readlines():
        el = line[:-1].split(' ')
        a, b = el[0], el[1]
        if b == "X":
            pts += pt[wins[a]]
        elif b == "Y":
            pts += pt[a] + 3
        else:
            temp = wins[a]
            this_one = list(filter(lambda x : x != a and x != temp ,['A','B','C']))[0]
            pts += pt[this_one] + 6 

print(pts)
