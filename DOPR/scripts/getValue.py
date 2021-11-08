import datetime
import json

def parse(timesinput, step):
    """
    index 0 is before 1*step
    index 1 is before 2*step
    etc.
    """
    output = [0]
    for times in timesinput:
        limitTime = datetime.datetime(1,1,1,0,0,0)+step
        i = 0
        for time in json.loads(times):
            if time == []:
                continue
            while time[0] > str(limitTime)[11:] and limitTime.day == 1:
                limitTime += step
                output.append(0)
                i += 1
            output[i] += 1
        return output


delay = datetime.timedelta(hours=1)

while True:
    try:
        line = input().rstrip().split("|")
    except EOFError:
        break
    print(line[0],parse(line[1:2], delay), sep="|")
