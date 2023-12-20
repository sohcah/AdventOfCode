import { loadTrimmed, output } from "aocutils";

const input = loadTrimmed().split("\n");

//console.log(input);
const rows = input.length;
const cols = input[0].length;
let col;
let row;

for (row = 0; row < rows; row++) {
	if (input[row].indexOf("S") != "-1") {
		col = input[row].indexOf("S");
		break;
	}
}
const start = [row, col];
//console.log(row, col);

const pos = [[row, col]];
let dir;

if (input[row][col - 1] == "-" || input[row][col - 1] == "L" || input[row][col - 1] == "F") {
	col--;
	pos.push([row, col]);
	dir = "left";
} else {
	if (input[row - 1][col] == "|" || input[row - 1][col] == "7" || input[row - 1][col] == "F") {
		row--;
		pos.push([row, col]);
		dir = "up";
	} else {
		if (input[row][col + 1] == "-" || input[row][col + 1] == "7" || input[row][col + 1] == "J") {
			col++;
			pos.push([row, col]);
			dir = "right";
		} else {
			throw "error";
		}
	}
}

//console.log(pos, dir);
while (row!=start[0] || col!=start[1]) {
	if (dir == "left") {
		switch (input[row][col]) {
			case "-":
				col--;
				pos.push([row, col]);
				dir = "left";
				break;
			case "L":
				row--;
				pos.push([row, col]);
				dir = "up";
				break;
			case "F":
				row++;
				pos.push([row, col]);
				dir = "down";
				break;
		}
	}
	if (dir == "up") {
		switch (input[row][col]) {
			case "|":
				row--;
				pos.push([row, col]);
				dir = "up";
				break;
			case "7":
				col--;
				pos.push([row, col]);
				dir = "left";
				break;
			case "F":
				col++;
				pos.push([row, col]);
				dir = "right";
				break;
		}
	}
	if (dir == "right") {
		switch (input[row][col]) {
			case "-":
				col++;
				pos.push([row, col]);
				dir = "right";
				break;
			case "J":
				row--;
				pos.push([row, col]);
				dir = "up";
				break;
			case "7":
				row++;
				pos.push([row, col]);
				dir = "down";
				break;
		}
	}
	if (dir == "down") {
		switch (input[row][col]) {
			case "|":
				row++;
				pos.push([row, col]);
				dir = "down";
				break;
			case "J":
				col--;
				pos.push([row, col]);
				dir = "left";
				break;
			case "L":
				col++;
				pos.push([row, col]);
				dir = "right";
				break;
		}
	}
}
let answer = (pos.length-1)/2
//console.log(pos, dir);
output(answer).forTest(8).forActual(6820);
