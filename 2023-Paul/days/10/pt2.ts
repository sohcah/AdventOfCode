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
const start = row * cols + col;
//console.log(start);

const pos = [row * cols + col];
let dir;

if (input[row][col - 1] == "-" || input[row][col - 1] == "L" || input[row][col - 1] == "F") {
	col--;
	pos.push(row * cols + col);
	dir = "left";
} else {
	if (input[row - 1][col] == "|" || input[row - 1][col] == "7" || input[row - 1][col] == "F") {
		row--;
		pos.push(row * cols + col);
		dir = "up";
	} else {
		if (input[row][col + 1] == "-" || input[row][col + 1] == "7" || input[row][col + 1] == "J") {
			col++;
			pos.push(row * cols + col);
			dir = "right";
		} else {
			throw "error";
		}
	}
}
const dir1 = dir;

//console.log(pos, dir);
while (row * cols + col != start) {
	if (dir == "left") {
		switch (input[row][col]) {
			case "-":
				col--;
				pos.push(row * cols + col);
				dir = "left";
				break;
			case "L":
				row--;
				pos.push(row * cols + col);
				dir = "up";
				break;
			case "F":
				row++;
				pos.push(row * cols + col);
				dir = "down";
				break;
		}
	}
	if (dir == "up") {
		switch (input[row][col]) {
			case "|":
				row--;
				pos.push(row * cols + col);
				dir = "up";
				break;
			case "7":
				col--;
				pos.push(row * cols + col);
				dir = "left";
				break;
			case "F":
				col++;
				pos.push(row * cols + col);
				dir = "right";
				break;
		}
	}
	if (dir == "right") {
		switch (input[row][col]) {
			case "-":
				col++;
				pos.push(row * cols + col);
				dir = "right";
				break;
			case "J":
				row--;
				pos.push(row * cols + col);
				dir = "up";
				break;
			case "7":
				row++;
				pos.push(row * cols + col);
				dir = "down";
				break;
		}
	}
	if (dir == "down") {
		switch (input[row][col]) {
			case "|":
				row++;
				pos.push(row * cols + col);
				dir = "down";
				break;
			case "J":
				col--;
				pos.push(row * cols + col);
				dir = "left";
				break;
			case "L":
				col++;
				pos.push(row * cols + col);
				dir = "right";
				break;
		}
	}
}
const dir2 = dir;
let S = "";

if (dir1 == "left") {
	if (dir2 == "left") {
		S = "-";
	}
	if (dir2 == "up") {
		S = "7";
	}
	if (dir2 == "down") {
		S = "J";
	}
}
if (dir1 == "up") {
	if (dir2 == "up") {
		S = "|";
	}
	if (dir2 == "left") {
		S = "L";
	}
	if (dir2 == "right") {
		S = "J";
	}
}
if (dir1 == "right") {
	if (dir2 == "right") {
		S = "-";
	}
	if (dir2 == "up") {
		S = "F";
	}
	if (dir2 == "down") {
		S = "L";
	}
}
if (dir1 == "down") {
	if (dir2 == "down") {
		S = "|";
	}
	if (dir2 == "left") {
		S = "F";
	}
	if (dir2 == "right") {
		S = "7";
	}
}

const clean = [];
for (let i = 0; i < rows; i++) {
	let string = "";
	for (let j = 0; j < cols; j++) {
		if (pos.includes(i * cols + j)) {
			if (input[i][j] == "S") {
				string += S;
			} else {
				string += input[i][j];
			}
		} else {
			string += ".";
		}
	}
	clean.push(string);
}

//console.log(clean);
let count = 0;

for (let line of clean) {
  line = line
    .replaceAll(/\-/g, "")
    .replaceAll(/LJ/g, "")
    .replaceAll(/F7/g, "")
    .replaceAll(/FJ/g, "|")
    .replaceAll(/L7/g, "|")
    .replaceAll(/\|\|/g,"")
    .replaceAll(/\./g," ").trim();

  //console.log(line);
  let inside = false;
  for (let j = 0; j < line.length; j++) {
    //console.log(clean[i][j]);
    if (line[j] == " ") {
      if (inside) {count++}
    }
    if (line[j] == "|") {
      inside = !inside;
    }
  }
}





output(count).forTest(10).forActual(337);
