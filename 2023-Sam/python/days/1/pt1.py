from aocutils import input, output

lines = input().splitlines()

sum = 0
for line in lines:
    numbers = []
    for i in range(0, len(line)):
        if line[i].isnumeric():
            numbers.append(int(line[i]))
    sum += numbers[0] * 10 + numbers[-1]

output(sum, for_test=142, for_actual=54990)
