import json
trans = json.loads(open("translate.json").read())

output = []
while True:
    try:
        out = {}
        line = input().rstrip().split("|")
        x = trans["\"KP"+line[0]+"\""]
        out["name"] = x[1]
        out["location"] = x[0]
        out["value"] = line[1]
        output.append(out)
    except EOFError:
        break
    except KeyError:
        continue
print(json.dumps(output))
