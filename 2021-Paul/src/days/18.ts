
import fs  from "fs";

function add(s:string,t:string) {
  return "[" + s + "," + t + "]";
}

export function Part1() {

  const input = fs.readFileSync("./inputs/18.txt","utf8").trim().split("\n");
  
  let sum = input[0];
  for (let i = 1;i<input.length;i++) {
    sum = add(sum,input[i]);
    console.log("  "+sum);
    console.log("+ "+input[1]);

    let change = true;
    while (change == true) {
      change = false;
      
      let explosion = true;
      while (explosion == true) {
        explosion = false;
        let bracketDepth = 0;
        loop1:
        for (let j=0;j<sum.length;j++) {
          if (sum[j] == "[") {
            bracketDepth++
          }
          if (sum[j] == "]") {
            bracketDepth--
          }
          if (bracketDepth == 5) {
            let left = Number(sum.slice(j+1,sum.indexOf(",",j)));
            let right = Number(sum.slice(sum.indexOf(",",j)+1,sum.indexOf("]",j)));
            sum = sum.slice(0,j)+"0"+sum.slice(sum.indexOf("]",j)+1);

            loop2:
            for (let k = j+1;k<sum.length;k++) {
              if (sum.charCodeAt(k)>=48 && sum.charCodeAt(k)<=57) {
                let l=k;
                while (sum.charCodeAt(l)>=48 && sum.charCodeAt(l)<=57) {
                  l++;
                }
                right+=Number(sum.slice(k,l));
                sum = sum.slice(0,k)+right.toString()+sum.slice(l);
                break loop2;
              }
            }

            loop3:
            for (let k = j-2;k>0;k--) {
              if (sum.charCodeAt(k)>=48 && sum.charCodeAt(k)<=57) {
                let l=k;
                while (sum.charCodeAt(l)>=48 && sum.charCodeAt(l)<=57) {
                  l--;
                }
                left+=Number(sum.slice(l+1,k+1));
                sum = sum.slice(0,l+1)+left.toString()+sum.slice(k+1);
                break loop3;
              }
            }
            explosion = true;
            change = true;
            break loop1;
          }
        }
        
        //console.log(sum);
      }

      var num = sum.match(/[1-9][0-9]+/);
      if(num !== null) {
        let left = Math.floor(Number(num[0])/2);
        let right = Math.ceil(Number(num[0])/2);
        sum = sum.slice(0,num.index) + "[" + left.toString() + "," + right.toString() + "]" + sum.slice(num.index!+num[0].length);
        change = true;
      }
    }
    
    console.log("= " + sum);
    console.log();
    
  }

  while (sum.includes("[")) {
    sum = sum.replace(/\[(\d+),(\d+)\]/g,(_, a, b) => (3 * Number(a) + 2 * Number(b)).toString())//(3*$1+2*$2).toString());
  }
  console.log("Magnitude = " + sum);
}

export function Part2() {

  const input = fs.readFileSync("./inputs/18.txt","utf8").trim().split("\n");

  let maxMagnitude = 0;

  for (let a = 0;a<input.length;a++) {
    for (let b = 0;b<input.length;b++) {
      if (a!=b) {
        let sum = add(input[a],input[b]);

            
        let change = true;
        while (change == true) {
          change = false;
          
          let explosion = true;
          while (explosion == true) {
            explosion = false;
            let bracketDepth = 0;
            loop1:
            for (let j=0;j<sum.length;j++) {
              if (sum[j] == "[") {
                bracketDepth++
              }
              if (sum[j] == "]") {
                bracketDepth--
              }
              if (bracketDepth == 5) {
                let left = Number(sum.slice(j+1,sum.indexOf(",",j)));
                let right = Number(sum.slice(sum.indexOf(",",j)+1,sum.indexOf("]",j)));
                sum = sum.slice(0,j)+"0"+sum.slice(sum.indexOf("]",j)+1);

                loop2:
                for (let k = j+1;k<sum.length;k++) {
                  if (sum.charCodeAt(k)>=48 && sum.charCodeAt(k)<=57) {
                    let l=k;
                    while (sum.charCodeAt(l)>=48 && sum.charCodeAt(l)<=57) {
                      l++;
                    }
                    right+=Number(sum.slice(k,l));
                    sum = sum.slice(0,k)+right.toString()+sum.slice(l);
                    break loop2;
                  }
                }

                loop3:
                for (let k = j-2;k>0;k--) {
                  if (sum.charCodeAt(k)>=48 && sum.charCodeAt(k)<=57) {
                    let l=k;
                    while (sum.charCodeAt(l)>=48 && sum.charCodeAt(l)<=57) {
                      l--;
                    }
                    left+=Number(sum.slice(l+1,k+1));
                    sum = sum.slice(0,l+1)+left.toString()+sum.slice(k+1);
                    break loop3;
                  }
                }
                explosion = true;
                change = true;
                break loop1;
              }
            }
            
            //console.log(sum);
          }

          var num = sum.match(/[1-9][0-9]+/);
          if(num !== null) {
            let left = Math.floor(Number(num[0])/2);
            let right = Math.ceil(Number(num[0])/2);
            sum = sum.slice(0,num.index) + "[" + left.toString() + "," + right.toString() + "]" + sum.slice(num.index!+num[0].length);
            change = true;
          }
        }
        
        while (sum.includes("[")) {
          sum = sum.replace(/\[(\d+),(\d+)\]/g,(_, a, b) => (3 * Number(a) + 2 * Number(b)).toString())//(3*$1+2*$2).toString());
        }
        if (Number(sum)>maxMagnitude) {
          maxMagnitude = Number(sum);
          console.log("Max so far = " + sum);
        };
      }
    }
  }

  console.log();
  console.log("Maximum magnitude = " + maxMagnitude);
}
