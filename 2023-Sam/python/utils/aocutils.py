import os
import json
import time

def input():
    global startTime
    # parse AOC_INPUT environemnt variable json
    input = os.environ.get('AOC_INPUT')
    if input is None:
        raise Exception('AOC_INPUT environment variable not set')
    inputJson = json.loads(input)
    startTime = time.time()
    # read file from process.env.AOC_INPUT
    with open(inputJson["inputFile"], 'r') as f:
        return f.read()

def output(result, for_test=None, for_actual=None):
    global startTime
    file = os.environ.get('AOC_OUTPUT')
    if file is None:
        raise Exception('AOC_OUTPUT environment variable not set')

    dict = {
        "result": result,
        "expected": os.environ.get('AOCTEST') == 'true' and for_test or for_actual,
        "time": (time.time() - startTime) * 1000
    }

    with open(file, 'w') as f:
        f.write(json.dumps(dict))
