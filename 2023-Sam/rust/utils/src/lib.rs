use serde;
use serde_json;

pub fn add(left: usize, right: usize) -> usize {
    left + right
}

#[derive(serde::Deserialize)]
struct AocInput {
    #[serde(rename = "inputFile")]
    input_file: String,
    #[serde(rename = "stabiliseValue")]
    #[allow(dead_code)]
    stabilise_value: Option<usize>,
}

#[derive(serde::Serialize)]
#[serde(tag = "type")]
enum DayResult<T: serde::Serialize> {
    #[serde(rename = "stabilise")]
    #[allow(dead_code)]
    Stabilise {
        start: usize,
        increment: usize,
        #[serde(rename = "stableCount")]
        stable_count: usize,
    },
    #[serde(rename = "result")]
    Result {
        result: T,
        #[serde(skip_serializing_if = "Option::is_none")]
        expected: Option<T>,
        time: f64,
    },
}

fn get_input() -> AocInput {
    let input_data = std::env::var("AOC_INPUT").expect("AOC_INPUT not set");
    serde_json::from_str(&input_data).expect("AOCINPUT not valid JSON")
}

fn write_output<T: serde::Serialize>(result: DayResult<T>) {
    let output_file = std::env::var("AOC_OUTPUT").expect("AOC_OUTPUT not set");
    let json_result = serde_json::to_string(&result).expect("Failed to convert result to JSON");
    std::fs::write(output_file, json_result).expect("Failed to write result to output file");
}

fn is_test() -> bool {
    std::env::var("AOCTEST").is_ok()
}

pub struct Expected<T: serde::Serialize> {
    test: Option<T>,
    actual: Option<T>,
}
impl <T: serde::Serialize + Clone> Expected<T> {
    pub fn none() -> Self {
        Self {
            test: None,
            actual: None,
        }
    }
    pub fn test(test: T) -> Self {
        Self {
            test: Some(test),
            actual: None,
        }
    }
    pub fn actual(mut self, actual: T) -> Self {
        self.actual = Some(actual);
        self
    }
    fn get(&self) -> Option<T> {
        if is_test() {
            self.test.clone()
        } else {
            self.actual.clone()
        }
    }
}

pub fn should_log() -> bool {
    !std::env::var("NO_LOG").is_ok()
}

#[macro_export]
macro_rules! aoc_log {
    ($($arg:tt)*) => {
        if $crate::should_log() {
            println!($($arg)*);
        }
    };
}

pub fn with_aoc_stabilise<T: serde::Serialize + Clone>(func: fn(&str, usize) -> T, start: usize, increment: usize, stable_count: usize, expected: Expected<T>) {
    let input = get_input();
    if input.stabilise_value.is_none() {
        let result: DayResult<T> = DayResult::Stabilise {
            start,
            increment,
            stable_count,
        };
        write_output(result);
        return
    }
    let file_contents = std::fs::read_to_string(&input.input_file).expect("input file not found");
    let start_time = std::time::Instant::now();
    let func_result = func(file_contents.as_str(), input.stabilise_value.unwrap());
    let time = (start_time.elapsed().as_nanos() as f64) / 1_000_000f64;
    let result = DayResult::Result {
        result: func_result,
        expected: expected.get(),
        time,
    };
    write_output(result);
}

pub fn with_aoc<F: FnOnce( & str) -> T, T: serde::Serialize + Clone>(func: F, expected: Expected<T>) {
    let input = get_input();
    let file_contents = std::fs::read_to_string(&input.input_file).expect("input file not found");
    let start_time = std::time::Instant::now();
    let func_result = func(file_contents.as_str());
    let time = (start_time.elapsed().as_nanos() as f64) / 1_000_000f64;
    let result = DayResult::Result {
        result: func_result,
        expected: expected.get(),
        time,
    };
    write_output(result);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }

    #[test]
    fn test_serialise() {
        let result = DayResult::Result {
            result: "hello".to_string(),
            expected: None,
            time: 0f64,
        };
        let json_result = serde_json::to_string(&result).expect("Failed to convert result to JSON");
        assert_eq!(json_result, "{\"type\":\"result\",\"result\":\"hello\",\"time\":0}");
    }
}
