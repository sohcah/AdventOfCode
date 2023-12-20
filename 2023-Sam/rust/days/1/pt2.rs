use std::ops::Index;
use aocutils::Expected;
use aocutils::with_aoc;
use regex::Regex;

fn text_to_int(text: &str) -> i32 {
    match text {
        "one" => 1,
        "two" => 2,
        "three" => 3,
        "four" => 4,
        "five" => 5,
        "six" => 6,
        "seven" => 7,
        "eight" => 8,
        "nine" => 9,
        _ => text.parse::<i32>().unwrap(),
    }
}

fn main() {
    let re = Regex::new(r"\d|one|two|three|four|five|six|seven|eight|nine").unwrap();
    let re_end = Regex::new(r".*(\d|one|two|three|four|five|six|seven|eight|nine)").unwrap();
    with_aoc(|input: &str| {
        let mut sum = 0;
        for line in input.lines() {
            let start = re.find(line).unwrap().as_str();
            let end = re_end.captures(line).unwrap();
            sum += text_to_int(start) * 10 + text_to_int(end.index(1));
        }
        sum
    }, Expected::test(281).actual(54473));
}
