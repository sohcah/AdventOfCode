from aocutils import input, output

lines = input().splitlines()

mapping = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
}

sum = 0
for line in lines:
    numbers = []
    for i in range(0, len(line)):
        for m in mapping:
            if line[i:i+len(m)] == m:
                numbers.append(mapping[m])
        if len(numbers) == 1:
            break
    for i in range(len(line) - 1, -1, -1):
        for m in mapping:
            if line[i:i+len(m)] == m:
                numbers.append(mapping[m])
                break
        if len(numbers) == 2:
            break
    sum += numbers[0] * 10 + numbers[-1]

output(sum, for_test=281, for_actual=54473)
