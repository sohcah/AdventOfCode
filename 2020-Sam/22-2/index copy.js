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

const setsHad = new Set();

let winner = null;
let game = 0;
play: while(!winner) {
  game++;
  console.log(`-- Game ${game} --`);
  let round = 0;
  while(players.filter(i=>i.cards.length !== 0).length !== 1) {
    round++;
    console.log(`-- Round ${round} --`);
    let x = ``;
    for(const player of players.slice().sort((a,b)=>a.number-b.number)) {
      x+=`${player.number}/${player.cards.join(',')}`
      console.log(`${player.name}'s deck: ${player.cards.join(', ')}`);
    }
    if(setsHad.has(x)) {
      console.log(`Player 1 wins the round by BREAKOUT!\n`);
      winner = players.slice().sort((a,b)=>a.number-b.number)[0];
      break;
    }
    setsHad.add(x);

    for(const player of players.slice().sort((a,b)=>a.number-b.number)) {
      console.log(`${player.name} plays: ${player.cards[0]}`);
    }

    let canNewGame = true;
    for(const player of players) {
      if(player.cards[0] > player.cards.length) canNewGame = false;
    }
    if(canNewGame) {
      console.log(`New Game Starting...\n`);
      break;
    }
    const roundwinner = players.sort((a,b) => b.cards[0] - a.cards[0])[0];
    console.log(`${roundwinner.name} wins the round!\n`);
    const cards = players.map(i=>i.cards[0]);
    players.forEach(i=>i.cards.splice(0, 1));
    roundwinner.cards.push(...cards);
  }
  if(players.filter(i=>i.cards.length !== 0).length === 1) {
    winner = players.find(i=>i.cards.length > 0);
  }
  console.log(winner)
}
console.log(`== Post-game results ==`);
for(const player of players) {
  console.log(`${player.name}'s deck: ${player.cards.join(', ')}`);
}
console.log(`Winner's score: ${players[0].cards.reduce((a,b,i,r) => a + (b * (r.length - i)), 0)}`);