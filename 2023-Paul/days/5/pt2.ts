import { loadTrimmed, output} from "aocutils";

const input = loadTrimmed().slice(7).split("\n\n").map((i,n)=>i.split("\n").slice(n === 0 ? 0 : 1).map(i=>i.split(" ").map(Number)));

let minSeed = Infinity;
for (let i = 0;i<input[0][0].length;i+=2) {
  for (let seed = input[0][0][i]; seed < input[0][0][i]+input[0][0][i+1]; seed++) {
    let mapsTo = seed;
    for (let j = 1; j < input.length; j++) {
      let mapsFrom = mapsTo;
      for (let k = 0; k < input[j].length; k++) {
        //console.log(input[j][k]);
        if (mapsFrom >= input[j][k][1] && mapsFrom < input[j][k][1] + input[j][k][2]) {
          mapsTo = mapsFrom - input[j][k][1] + input[j][k][0];
          break;
        }
      }
      //console.log(mapsTo);
    }
    if (mapsTo < minSeed) {
      minSeed = mapsTo
    }
    ;
    //console.log(mapsTo);
  }
}

output(minSeed).forTest(46);
