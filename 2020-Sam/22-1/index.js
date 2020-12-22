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

let round = 0;
while(players.filter(i=>i.cards.length !== 0).length !== 1) {
  round++;
  console.log(`-- Round ${round} --`);
  for(const player of players) {
    console.log(`${player.name}'s deck: ${player.cards.join(', ')}`);
  }
  for(const player of players) {
    console.log(`${player.name} plays: ${player.cards[0]}`);
  }
  const winner = players.sort((a,b) => b.cards[0] - a.cards[0])[0];
  console.log(`${winner.name} wins the round!\n`);
  const cards = players.map(i=>i.cards[0]);
  players.forEach(i=>i.cards.splice(0, 1));
  winner.cards.push(...cards);
}

console.log(`== Post-game results ==`);
for(const player of players) {
  console.log(`${player.name}'s deck: ${player.cards.join(', ')}`);
}
console.log(`Winner's score: ${players[0].cards.reduce((a,b,i,r) => a + (b * (r.length - i)), 0)}`);