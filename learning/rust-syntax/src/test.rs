#![cfg(test)]
extern crate std;

use super::SyntaxContract;

#[test]
fn adds_two_numbers() {
    let sum = SyntaxContract::add(3, 4);
    assert_eq!(sum, 7);
}
