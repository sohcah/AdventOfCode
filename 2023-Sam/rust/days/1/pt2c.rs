use aocutils::Expected;
use aocutils::with_aoc;
use onig::{Regex};

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
            let start = re.find(line).unwrap();
            let end = re_end.captures(line).unwrap();
            let start_text = &line[start.0..start.1];
            sum += text_to_int(start_text) * 10 + text_to_int(end.at(1).unwrap());
        }
        sum
    }, Expected::test(281).actual(54473));
}
