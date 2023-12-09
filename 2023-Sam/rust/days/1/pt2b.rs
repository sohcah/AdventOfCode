use aocutils::Expected;
use aocutils::with_aoc;
use regex_automata::{meta::Regex};

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
    let re_set = Regex::new_many(&[
        r"\d",
        r"one",
        r"two",
        r"three",
        r"four",
        r"five",
        r"six",
        r"seven",
        r"eight",
        r"nine"
    ]).unwrap();
    with_aoc(|input: &str| {
        let mut sum = 0;
        for line in input.lines() {
            let mut start: Option<&str> = None;
            let mut end: Option<&str> = None;
            for caps in re_set.captures_iter(line) {
                end = Some(&line[caps.get_group(0).unwrap()]);
                println!("{}", end.unwrap());
                start = start.or(end);
            }
            sum += text_to_int(start.unwrap()) * 10 + text_to_int(end.unwrap());
        }
        sum
    }, Expected::test(281).actual(54473));
}
