#![cfg(test)]
extern crate std;

use super::ConditionalsContract;

#[test]
fn sums_values_to_limit() {
    let result = ConditionalsContract::sum_to(4);
    assert_eq!(result, 10);
}
