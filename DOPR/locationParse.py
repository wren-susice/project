import json
f = open("locations.json")
data = json.loads(f.read())

output = {}
while True:
    try:
        line = input().rstrip().split("|")
    except EOFError:
        break
    output[line[3]] = [data[line[3][1:-1]]["location"], line[0]]

print(json.dumps(output))
