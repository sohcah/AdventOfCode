use std::fs;

fn main() {
    let input = fs::read_to_string("input/01.txt").expect("failure opening input file");
    let line = input;
    println!("Part 1: {:?}", p1(&line));
    println!("Part 2: {:?}", p2(&line));
}

fn p1(line: &String) -> i32 {
  let mut floor = 0i32;
  for name in line.chars() {
    if name == '(' {
      floor = floor + 1;
    } else {
      floor = floor - 1;
    }
  }
  return floor;
}

fn p2(line: &String) -> i32 {
  let mut floor = 0i32;
  let mut index = 0;
  for name in line.chars() {
    index+=1;
    if name == '(' {
      floor = floor + 1;
    } else {
      floor = floor - 1;
    }
    if floor < 0 {
      return index;
    }
  }
  return -1;
}