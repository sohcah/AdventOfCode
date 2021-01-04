const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n').map(i=>i.match(/([^\(\)]+)\s?(?:\(contains (.+)\))?$/)).map(i=>{
  return [i[1].trim().split(' '), i[2].split(', ')]
});


const ingredients = new Set();
const ingredients_counter = new Map();

for(const line of input) {
  for(const ingred of line[0]) {
    ingredients.add(ingred);
    ingredients_counter.set(ingred, (ingredients_counter.get(ingred) || 0) + 1);
  }
}

const allergens = new Map();

for(const line of input) {
  for(const aller of line[1]) {
    if(!allergens.has(aller)) allergens.set(aller, new Set(ingredients));
    for(const ingred of allergens.get(aller)) {
      if(!line[0].includes(ingred)) allergens.get(aller).delete(ingred);
    }
  }
}

let npa_counter = 0;
for(const ingred of ingredients) {
  let possible_has_allergen = false;
  for(const aller of allergens) {
    if(aller[1].has(ingred)) possible_has_allergen = true;
  }
  if(possible_has_allergen) console.log(ingred, ingredients_counter.get(ingred));
  if(!possible_has_allergen) npa_counter += ingredients_counter.get(ingred);
}
console.log(npa_counter)

// console.log(ingredients_counter);