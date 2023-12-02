# A | X : Rock
# B | Y : Paper
# C | Z : Scissors
assoc = {
        "X": "A",
        "Y": "B",
        "Z": "C"
        }

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
        a, b = el[0], assoc[el[1]]
        if a == b:
            pts += 3 
        else:
            if wins[b] == a:
                pts += 6
        pts += pt[b]

print(pts)
