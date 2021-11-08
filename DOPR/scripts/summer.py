import sys

radars = {}

while True:
    try:
        line = input().rstrip().split("|")
    except EOFError:
        break
    if line[0] not in radars:
        radars[line[0]] = [[], []]
    #line:
    #cidlo, smer, cas, pocet, rychlost
    radars[line[0]][int(line[1])-1].append(*[[line[2][12:-5], line[4]] for i in range(int(line[3]))])
    if radars[line[0]][int(line[1])-1] == []:
        radars[line[0]][int(line[1])-1] = ["0;0"]

for radar in radars.keys():
    print((str(radar) + "|" + str(radars[radar][0]) + "|" + str( radars[radar][1])).replace("'",'"'))
