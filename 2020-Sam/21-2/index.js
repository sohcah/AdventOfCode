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

const ingredient_allergens = new Map();

for(const ingred of ingredients) {
  let possible_allergens = [];;
  for(const aller of allergens) {
    if(aller[1].has(ingred)) possible_allergens.push(aller[0]);
  }
  if(possible_allergens.length > 0) {
    ingredient_allergens.set(ingred, possible_allergens)
  }
}

const allergent_ingredient = new Map();

while(Array.from(ingredient_allergens.values()).some(a=>typeof a === "object")) {
  for(const [ingred, allers] of Array.from(ingredient_allergens).filter(a=>typeof a[1] === "object")) {
    if(allers.filter(i=>!allergent_ingredient.has(i)).length === 1) {
      const aller = allers.find(i=>!allergent_ingredient.has(i));
      allergent_ingredient.set(aller, ingred);
      ingredient_allergens.set(ingred, aller);
    }
  }
}

console.log(Array.from(allergent_ingredient).sort((a,b)=>[a[0],b[0]].sort()[0] === a[0] ? -1 : 1).map(i=>i[1]).join(','));