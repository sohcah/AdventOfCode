use aocutils::Expected;
use aocutils::with_aoc;
use aocutils::aoc_log;

fn main() {
    with_aoc(|input| {
        let mut sum = 0;
        for line in input.lines() {
            let mut start = None;
            for i in 0..line.len() {
                if line.as_bytes()[i].is_ascii_digit() {
                    start = Some(line[i..=i].parse::<i32>().unwrap());
                    break;
                }
            }

            let mut end = None;
            for i in (0..line.len()).rev() {
                if line.as_bytes()[i].is_ascii_digit() {
                    end = Some(line[i..=i].parse::<i32>().unwrap());
                    break;
                }
            }
            aoc_log!("{}{}", start.unwrap(), end.unwrap());
            sum += start.unwrap() * 10 + end.unwrap();
        }
        sum
    }, Expected::test(142).actual(54990));
}
