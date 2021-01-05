use std::fs;

fn main() {
  let input = fs::read_to_string("input/02.txt").expect("failure opening input file");
  let line = input;
  println!("Part 1: {:?}", p1(&line));
  println!("Part 2: {:?}", p2(&line));
}

fn p1(input: &String) -> i32 {
  let mut length = 0i32;
  for line in input.lines() {
    let nums = line.split("x").collect::<Vec<&str>>();
    let l = nums[0].parse::<i32>().unwrap();
    let w = nums[1].parse::<i32>().unwrap();
    let h = nums[2].parse::<i32>().unwrap();
    length += 2 * l * w;
    length += 2 * w * h;
    length += 2 * h * l;
    let sides = [l * w, w * h, h * l];
    let min_value = sides.iter().min();
    match min_value {
      None => println!("ERROR: Min value was not found"),
      Some(i) => length += i,
    }
  }
  return length;
}

fn p2(input: &String) -> i32 {
  let mut length = 0i32;
  for line in input.lines() {
    let nums = line.split("x").collect::<Vec<&str>>();
    let l = nums[0].parse::<i32>().unwrap();
    let w = nums[1].parse::<i32>().unwrap();
    let h = nums[2].parse::<i32>().unwrap();
    let mut sorted = vec![l,w,h];
    sorted.sort();
    length += sorted[0] + sorted[0] + sorted[1] + sorted[1];
    length += l * w * h;
  }
  return length;
}
