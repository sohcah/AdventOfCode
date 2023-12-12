use aocutils::*;

fn main() {
    with_aoc(|input: &str| {
        let mut sum = 0;
        for line in input.lines() {
            let mut start = None;
            for i in 0..line.len() {
                if line[i..].starts_with("one") {
                    start = Some(1);
                    break;
                }
                if line[i..].starts_with("two") {
                    start = Some(2);
                    break;
                }
                if line[i..].starts_with("three") {
                    start = Some(3);
                    break;
                }
                if line[i..].starts_with("four") {
                    start = Some(4);
                    break;
                }
                if line[i..].starts_with("five") {
                    start = Some(5);
                    break;
                }
                if line[i..].starts_with("six") {
                    start = Some(6);
                    break;
                }
                if line[i..].starts_with("seven") {
                    start = Some(7);
                    break;
                }
                if line[i..].starts_with("eight") {
                    start = Some(8);
                    break;
                }
                if line[i..].starts_with("nine") {
                    start = Some(9);
                    break;
                }
                if line.as_bytes()[i].is_ascii_digit() {
                    start = Some(line[i..=i].parse::<i32>().unwrap());
                    break;
                }
            }

            let mut end = None;
            for i in (0..line.len()).rev() {
                if line[i..].starts_with("one") {
                    end = Some(1);
                    break;
                }
                if line[i..].starts_with("two") {
                    end = Some(2);
                    break;
                }
                if line[i..].starts_with("three") {
                    end = Some(3);
                    break;
                }
                if line[i..].starts_with("four") {
                    end = Some(4);
                    break;
                }
                if line[i..].starts_with("five") {
                    end = Some(5);
                    break;
                }
                if line[i..].starts_with("six") {
                    end = Some(6);
                    break;
                }
                if line[i..].starts_with("seven") {
                    end = Some(7);
                    break;
                }
                if line[i..].starts_with("eight") {
                    end = Some(8);
                    break;
                }
                if line[i..].starts_with("nine") {
                    end = Some(9);
                    break;
                }
                if line.as_bytes()[i].is_ascii_digit() {
                    end = Some(line[i..=i].parse::<i32>().unwrap());
                    break;
                }
            }
            aoc_log!("{}{}", start.unwrap(), end.unwrap());
            sum += start.unwrap() * 10 + end.unwrap();
        }
        sum
    }, Expected::test(281).actual(54473));
}
