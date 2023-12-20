use aocutils::Expected;
use aocutils::with_aoc;
use aocutils::aoc_log;

fn main() {
    with_aoc(|input| {
        let mut sum = 0;
        for line in input.lines() {
            aoc_log!("line: {}", line);
            let colon = line.find(":").unwrap();
            let game = {
                let space = line.find(" ").unwrap();
                line[(space + 1)..colon].parse::<i32>().unwrap()
            };
            let list = line[(colon + 2)..]
                .split(|c| c == ',' || c == ';')
                .map(|i| i.trim_start());
            aoc_log!("game: {}", game);
            aoc_log!("list: {:?}", list);
            let mut max_red = 0;
            let mut max_blue = 0;
            let mut max_green = 0;
            for item in list {
                let (count_str, color) = item.split_once(" ").unwrap();
                let count = count_str.parse::<i32>().unwrap();
                aoc_log!("item: {}x {}", count, color);
                match color {
                    "red" => if count > max_red { max_red = count },
                    "blue" => if count > max_blue { max_blue = count },
                    "green" => if count > max_green { max_green = count },
                    _ => {}
                }
            }
            sum += max_red * max_green * max_blue;
        }
        sum
    }, Expected::test(2286).actual(66016));
}
