extern crate crypto;

use std::fs;
use crypto::md5::Md5;
use crypto::digest::Digest;

fn main() {
  let input = fs::read_to_string("input/04.txt").expect("failure opening input file");
  let line = input;
  println!("Part 1: {:?}", p1(&line));
  println!("Part 2: {:?}", p2(&line));
}

fn p1(input: &String) -> i32 {
  let mut hasher = Md5::new();
  let mut output = [0; 16];
  let input_bytes = input.as_bytes();
  for i in 0..1000000 {
    hasher.input(input_bytes);
    hasher.input(i.to_string().as_bytes());
    hasher.result(&mut output);
    if output[0] == 0 && output[1] == 0 && output[2] < 16 {
      return i
    };
    hasher.reset();
  }
  return -1;
}

fn p2(input: &String) -> i32 {
  let mut hasher = Md5::new();
  let mut output = [0; 16];
  let input_bytes = input.as_bytes();
  for i in 0..std::i32::MAX {
    hasher.input(input_bytes);
    hasher.input(i.to_string().as_bytes());
    hasher.result(&mut output);
    if output[0] == 0 && output[1] == 0 && output[2] == 0 {
      return i
    };
    hasher.reset();
  }
  return -1;
}