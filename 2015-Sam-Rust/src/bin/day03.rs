use std::collections::HashSet;
use std::fs;

fn main() {
  let input = fs::read_to_string("input/03.txt").expect("failure opening input file");
  let line = input;
  println!("Part 1: {:?}", p1(&line));
  println!("Part 2: {:?}", p2(&line));
}

fn p1(input: &String) -> i32 {
  let mut locations = HashSet::new();
  let mut location = [0, 0];
  locations.insert((location[0] * 100 + location[1]).to_string());
  for mov in input.chars() {
    if mov == '>' {
      location[1] += 1;
    } else if mov == '<' {
      location[1] -= 1;
    } else if mov == 'v' {
      location[0] -= 1;
    } else if mov == '^' {
      location[0] += 1;
    }
    locations.insert((location[0] * 100 + location[1]).to_string());
  }
  return locations.len() as i32;
}

fn p2(input: &String) -> i32 {
  let mut locations = HashSet::new();
  let mut location = [0, 0];
  let mut robolocation = [0, 0];
  let mut robo = true;
  locations.insert((location[0] * 100 + location[1]).to_string());
  for mov in input.chars() {
    robo = !robo;
    if robo {
      if mov == '>' {
        robolocation[1] += 1;
      } else if mov == '<' {
        robolocation[1] -= 1;
      } else if mov == 'v' {
        robolocation[0] -= 1;
      } else if mov == '^' {
        robolocation[0] += 1;
      }
      locations.insert((robolocation[0] * 100 + robolocation[1]).to_string());
    } else {
      if mov == '>' {
        location[1] += 1;
      } else if mov == '<' {
        location[1] -= 1;
      } else if mov == 'v' {
        location[0] -= 1;
      } else if mov == '^' {
        location[0] += 1;
      }
      locations.insert((location[0] * 100 + location[1]).to_string());
    }
  }
  return locations.len() as i32;
}
