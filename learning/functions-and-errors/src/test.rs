#![cfg(test)]
extern crate std;

use super::{FunctionsContract, MathError};

#[test]
fn divides_successfully() {
    let result = FunctionsContract::safe_divide(10, 2).unwrap();
    assert_eq!(result, 5);
}

#[test]
fn returns_error_on_zero_divisor() {
    let result = FunctionsContract::safe_divide(10, 0);
    assert_eq!(result, Err(MathError::DivisionByZero));
}
