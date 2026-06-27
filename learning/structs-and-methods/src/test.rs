#![cfg(test)]
extern crate std;

use super::StructsMethodsContract;

#[test]
fn increments_counter_value() {
    assert_eq!(StructsMethodsContract::increment_from(9), 10);
}
