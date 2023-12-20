use aocutils::Expected;
use aocutils::with_aoc;
use aocutils::aoc_log;

fn main() {
    with_aoc(|input| {
        let mut sum = 0;
        for line in input.lines() {
            aoc_log!("line: {}", line);
            let start_char = line.chars().find(|c| c.is_numeric()).unwrap();
            let end_char = line.chars().rfind(|c| c.is_numeric()).unwrap();
            aoc_log!("start: {} {}", start_char, end_char);
            let str = format!("{}{}", start_char, end_char);
            sum += str.parse::<i32>().unwrap();
        }
        sum
    }, Expected::test(142).actual(54990));
}
