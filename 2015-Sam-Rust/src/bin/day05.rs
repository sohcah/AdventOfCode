use std::fs;
use fancy_regex::Regex;

fn main() {
  let input = fs::read_to_string("input/05.txt").expect("failure opening input file");
  let line = input;
  println!("Part 1: {:?}", p1(&line));
  println!("Part 2: {:?}", p2(&line));
}

fn p1(input: &String) -> i32 {
  let mut count = 0i32;
  for line in input.lines() {
    let mut vowels = 0;
    let mut double = false;
    let mut bad = false;
    let mut prev = '_';
    for char in line.chars() {
      if char == 'a' || char == 'e' || char == 'i' || char == 'o' || char == 'u' {
        vowels += 1;
      }
      if char == prev {
        double = true;
      }
      if (prev == 'a' && char == 'b')
        || (prev == 'c' && char == 'd')
        || (prev == 'p' && char == 'q')
        || (prev == 'x' && char == 'y')
      {
        bad = true;
      }
      prev = char;
    }
    // println!("{} | {} Vowels | Double: {} | Prev: {}", line, vowels, double, prev);
    if double && vowels >= 3 && !bad {
      count += 1;
    }
  }
  return count;
}

fn p2(input: &String) -> i32 {
  let re1 = Regex::new(r"([a-z]{2}).*\1").unwrap();
  let re2 = Regex::new(r"([a-z]).\1").unwrap();
  let mut count = 0i32;
  for line in input.lines() {
    if re1.is_match(line).unwrap() && re2.is_match(line).unwrap() {
      count += 1;
    }
  }
  return count;
}
