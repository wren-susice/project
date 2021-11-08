import sys
import csv

"""
#import locations dict
locations = {}
with open("Locations.csv") as locations_file:
    reader = csv.reader(locations_file, delimiter="|")
    for line in reader:
        locations[line[3][2:]] = line

"""
def formatLine(line):
    line = [line[0][2:5], line[0][7:]] + line[1:3] + [str(int(line[5].split(".")[0]))]
    return line

while True:
    try:
        line = input().rstrip().split("|")
    except EOFError:
        break
    formated = formatLine(line)
    print("|".join(formated))
