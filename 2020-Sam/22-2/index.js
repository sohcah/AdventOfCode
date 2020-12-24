const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n\n');
const players = [];
for(const line of input) {
  const l = line.split('\n');
  players.push({
    name: l[0].slice(0,-1),
    number: Number(l[0].slice(7,-1)),
    cards: l.slice(1).map(i=>Number(i))
  });
}

let globalRoundCounter = 0;

function playGame(players, game, returnN) {
  const setsHad = new Set();
  for(let round = 1;true;round++) {
    globalRoundCounter++;
    // Test for Recursion
    
    // let x = 1;
    // for(const player of players) {
    //   x *= Math.pow(36288000, player.number - 1) * player.cards.reduce((a,b,i,r) => a + (b * (r.length - i)), 0);
    // }
    // let x = players.map(i=>`${i.cards.join(',')}`).join('/')
    let x = ``;
    for(const player of players) {
      x+=`${player.number}/${player.cards.join(',')}---`
    }
    if(setsHad.has(x)) {
      if(returnN) return players[0].number;
      return players[0];
    }
    setsHad.add(x);

    // Check for New Game
    let shouldNewGame = true;
    let winner = null;
    for(const player of players) {
      if(player.cards[0] > player.cards.length - 1) shouldNewGame = false;
    }
    if(shouldNewGame) {
      // Play New Game
      winner = playGame(players.slice().map(i=>({
        ...i,
        cards: i.cards.slice(1, i.cards[0]+1),
      })), game+1, true);
    } else {
      winner = players.slice().sort((a,b)=>b.cards[0]-a.cards[0])[0].number;
    }
    const winnerPlayer = players.find(i=>i.number===winner);
    const cards = [
      winnerPlayer.cards[0],
      ...players.filter(i=>i.number!==winner).map(i=>i.cards[0]),
    ]
    players.forEach(i=>i.cards.splice(0, 1));
    winnerPlayer.cards.push(...cards);
    if(players.filter(i=>i.cards.length !== 0).length === 1) {
      if(returnN) return players.find(i=>i.cards.length > 0).number;
      return players.find(i=>i.cards.length > 0);
    }
  }
}

const result = playGame(players, 1);
console.log(result.cards);
console.log(result.cards.reduce((a,b,i,r) => a + (b * (r.length - i)), 0))

console.log('Global Round Counter', globalRoundCounter);